import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { IGetResultQuizService } from '../interfaces/services/get-result.quiz.service.interface';
import { Quiz as QuizEntity } from '../../quiz/domain/quiz.entity';
import { QuizRun as QuizRunEntity } from '../domain/quiz_runs.entity';
import { LearnerQuiz as LearnerQuizEntity } from '../../learner/domain/learners_quizzes.entity';
import { QuizQuestion as QuizQuestionEntity } from '../../quiz/domain/quizzes_questions.entity';
import { QuestionRun as QuestionRunsEntity } from '../domain/question_runs.entity';
import { ReadResultQuizDto } from '../dto/read-result.quiz.dto';

@Injectable()
export class GetResultQuizService implements IGetResultQuizService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
    @InjectRepository(QuizRunEntity)
    readonly quizRunRepo: Repository<QuizRunEntity>,
    @InjectRepository(QuizQuestionEntity)
    private readonly quizQuestionRepo: Repository<QuizQuestionEntity>,
    @InjectRepository(QuestionRunsEntity)
    private readonly questionRunRepo: Repository<QuestionRunsEntity>,
    @InjectRepository(LearnerQuizEntity)
    private readonly learnerQuizRepo: Repository<LearnerQuizEntity>,
  ) {}

  async execute(quizId: number, spaceId: number): Promise<ReadResultQuizDto> {
    // 1) Quiz basic data
    const quiz = await this.quizRepo.findOne({
      where: { id: quizId, space: { id: spaceId } },
      select: ['id', 'title', 'visibility'],
    });
    if (!quiz) throw new NotFoundException('Quiz not found');

    // 2) Question count & completed runs
    const [totalQuestions, completedCount] = await Promise.all([
      this.quizQuestionRepo.count({ where: { quizId: quizId } }),
      this.quizRunRepo.count({
        where: {
          quizId: quizId,
          finishedAt: Not(IsNull()),
        },
      }),
    ]);

    // No questions or no completed runs, average = 0
    if (!totalQuestions || !completedCount) {
      return {
        quiz: { id: Number(quiz.id), title: quiz.title, totalQuestions },
        metrics: { completedCount, averageScore: 0, byQuestion: [], byLearner: null, completionRate: null },
      };
    }

    // 3) Total correct answers recorded for questions that belong to this quiz
    const correctRow = await this.questionRunRepo
      .createQueryBuilder('qr')
      .innerJoin('questions', 'q', 'q.id = qr.question_id')
      .innerJoin('quizzes_questions', 'qq', 'qq.question_id = qr.question_id')
      .innerJoin('quizzes', 'qz', 'qz.id = qq.quiz_id')
      .where('qz.id = :quizId', { quizId })
      .andWhere('qz.space_id = :spaceId', { spaceId })
      .select(
        `
        SUM(
          CASE
            WHEN qr.answer = (
              CASE
                WHEN q.is_phising = 1 THEN 'is_phishing'
                ELSE 'is_legitimate'
              END
            ) THEN 1
            ELSE 0
          END
        )
        `,
        'correctCount',
      )
      .getRawOne<{ correctCount: string | null }>();

    const correctCount = Number(correctRow?.correctCount ?? 0);

    // 4) Average = correct / (completed runs * total questions) * 100
    const denom = completedCount * totalQuestions;
    const average = denom ? (correctCount * 100) / denom : 0;

    return {
      quiz: { id: Number(quiz.id), title: quiz.title, totalQuestions },
      metrics: {
        completedCount,
        averageScore: Number(average.toFixed(1)),
        completionRate: quiz.visibility === 'private' ? await this.getCompletionRate(quizId) : null,
        byQuestion: await this.getResultsByQuestion(quizId),
        byLearner: quiz.visibility === 'private' ? await this.getResultsByLearner(quizId) : null,
      },
    };
  }

  private async getResultsByQuestion(quizId: number) {
    const questionResults = await this.questionRunRepo
      .createQueryBuilder('qr')
      .innerJoin('questions', 'q', 'q.id = qr.question_id')
      .innerJoin('quizzes_questions', 'qq', 'qq.question_id = qr.question_id')
      .innerJoin('quizzes', 'qz', 'qz.id = qq.quiz_id')
      .innerJoin('apps_questions', 'aq', 'aq.question_id = q.id')
      .innerJoin('apps', 'a', 'a.id = aq.app_id')
      .where('qz.id = :quizId', { quizId })
      .select([
        'q.id as questionId',
        'q.name as questionName',
        'q.content as questionContent',
        'q.is_phising as isPhising',
        'qq.position as position',
        'a.id as appId',
        'a.name as appName',
        'COUNT(qr.id) as totalRuns',
        "SUM(CASE WHEN qr.answer = (CASE WHEN q.is_phising = 1 THEN 'is_phishing' ELSE 'is_legitimate' END) THEN 1 ELSE 0 END) as correctCount",
      ])
      .groupBy(
        'q.id, q.name, q.content, q.is_phising, qq.position, a.id, a.name',
      )
      .orderBy('qq.position', 'ASC')
      .getRawMany();

    return questionResults;
  }

  private async getResultsByLearner(quizId: number) {
    const learnerResults = await this.questionRunRepo
      .createQueryBuilder('qr')
      .innerJoin('quiz_runs', 'qrun', 'qrun.id = qr.quiz_run_id')
      .innerJoin('learners', 'l', 'l.id = qrun.learner_id')
      .innerJoin('questions', 'q', 'q.id = qr.question_id')
      .innerJoin('quizzes_questions', 'qq', 'qq.question_id = qr.question_id')
      .innerJoin('quizzes', 'qz', 'qz.id = qq.quiz_id')
      .where('qz.id = :quizId', { quizId })
      .select([
        'l.id as learnerId',
        'l.name as learnerName',
        'l.email as learnerEmail',
        'qrun.finishedAt as dateSubmitted',
        'COUNT(qr.id) as totalQuestionRuns',
        "SUM(CASE WHEN qr.answer = (CASE WHEN q.is_phising = 1 THEN 'is_phishing' ELSE 'is_legitimate' END) THEN 1 ELSE 0 END) as correctCount",
      ])
      .where('qrun.finishedAt IS NOT NULL')
      .groupBy('l.id, l.name, l.email, qrun.finishedAt')
      .orderBy('l.name', 'ASC')
      .getRawMany();

    return learnerResults
  }

  private async getCompletionRate(quizId: number) {
    const rate = await this.learnerQuizRepo
      .createQueryBuilder('lq')
      .select("SUM(CASE WHEN lq.status = 'completed' THEN 1 ELSE 0 END) / COUNT(*) * 100 as completionRate")
      .where('lq.quiz_id = :quizId', { quizId })
      .getRawOne()

    return parseInt(rate.completionRate).toFixed(0) || '0'
      
  }
}

