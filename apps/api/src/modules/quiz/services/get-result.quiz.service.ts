import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { IGetResultQuizService } from '../interfaces/services/get-result.quiz.service.interface';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { QuizRuns as QuizRunsEntity } from '../domain/quiz_runs.entity';
import { QuizQuestion as QuizQuestionEntity } from '../domain/quizzes_questions.entity';
import { QuestionRun as QuestionRunsEntity } from '../domain/question_runs.entity';
import { ReadResultQuizDto } from '../dto/read-result.quiz.dto';

@Injectable()
export class GetResultQuizService implements IGetResultQuizService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
    @InjectRepository(QuizRunsEntity) 
     readonly quizRunRepo: Repository<QuizRunsEntity>,
    @InjectRepository(QuizQuestionEntity)
    private readonly quizQuestionRepo: Repository<QuizQuestionEntity>,
    @InjectRepository(QuestionRunsEntity)
    private readonly questionRunRepo: Repository<QuestionRunsEntity>,
  ) {}

  async execute(quizId: number, spaceId: number): Promise<ReadResultQuizDto> {
    // 1) Quiz basic data
    const quiz = await this.quizRepo.findOne({
      where: { id: quizId as any },
      select: ['id', 'title'],
    });
    if (!quiz) throw new NotFoundException('Quiz not found');

    // 2) Question count & completed runs
    const [totalQuestions, completedCount] = await Promise.all([
      this.quizQuestionRepo.count({ where: { quizId: quizId as any } }),
      this.quizRunRepo.count({
        where: {
          quizId: quizId as any,
          finishedAt: Not(IsNull()),
        },
      }),
    ]);

    // No questions or no completed runs, average = 0
    if (!totalQuestions || !completedCount) {
      return {
        quiz: { id: Number(quiz.id), title: quiz.title, totalQuestions },
        metrics: { completedCount, averageScore: 0 },
      };
    }

    // 3) Total correct answers recorded for questions that belong to this quiz
    const correctRow = await this.questionRunRepo
      .createQueryBuilder('qr')
      .innerJoin('questions', 'q', 'q.id = qr.question_id')
      .innerJoin('quizzes_questions', 'qq', 'qq.question_id = qr.question_id')
      .where('qq.quiz_id = :quizId', { quizId })
      .andWhere('quiz.spaceId = :spaceId', { spaceId }) 
      .select(
        `
        SUM(
          CASE
            WHEN ((q.is_phishing = 1 AND qr.answer = 'is_phishing')
               OR (q.is_phishing = 0 AND qr.answer = 'is_legitimate'))
            THEN 1 ELSE 0
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
      },
    };
  }
}
