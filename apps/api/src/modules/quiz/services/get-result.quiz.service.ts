import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetResultQuizService } from '../interfaces/services/get-result.quiz.service.interface';
import { QuizRuns as QuizRunsEntity } from '../domain/quiz_runs.entity';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { QuizQuestion as QuizQuestionEntity } from '../domain/quizzes_questions.entity';
import { ReadResultQuizDto } from '../dto/read-result.quiz.dto';

@Injectable()
export class GetResultQuizService implements IGetResultQuizService {

  constructor(
    @InjectRepository(QuizRunsEntity)
    private readonly quizRunRepo: Repository<QuizRunsEntity>,
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
    @InjectRepository(QuizQuestionEntity)
    private readonly quizQuestionRepo: Repository<QuizQuestionEntity>,
  ) { }

  async execute(quizId: number): Promise<ReadResultQuizDto> {
    console.log("🚀 ~ GetResultQuizService ~ execute ~ quizId:", quizId);

    // 1) Fetch quiz basic information + count how many questions belong to it
    const quizRow = await this.quizRepo
      .createQueryBuilder('q')
      .leftJoin('q.quizzesQuestions', 'qq')
      .where('q.id = :quizId', { quizId })
      .select(['q.id AS id', 'q.title AS title'])
      .addSelect('COUNT(qq.id)', 'totalQuestions')
      .getRawOne<{ id: number; title: string; totalQuestions: string }>();

    const totalQuestions = Number(quizRow?.totalQuestions ?? 0);

    // 2) Count the number of quiz runs that were completed
    const { completedCount } = await this.quizRunRepo
      .createQueryBuilder('r')
      .select('COUNT(*)', 'completedCount')
      .where('r.quiz_id = :quizId', { quizId })
      .andWhere('r.finished_at IS NOT NULL') // only finished runs
      .getRawOne<{ completedCount: string }>();

    // 3) Calculate the average score across all completed runs
    //    Score for each run = (correct answers / total questions) * 100
    //    Then take the average of those scores.

    // Subquery: count total questions for this quiz
    const totalQSub = this.quizQuestionRepo
      .createQueryBuilder('qq')
      .select('COUNT(qq.id)')
      .where('qq.quiz_id = :quizId', { quizId });

    // Subquery: calculate the score for each individual run
    const perRunSub = this.quizRunRepo
      .createQueryBuilder('r')
      .select('r.id', 'run_id')
      .addSelect(
        `
      SUM(
        CASE
          WHEN ( (q.is_phishing = 1 AND qr.answer = 'is_phishing')
              OR (q.is_phishing = 0 AND qr.answer = 'is_legitimate') )
          THEN 1 ELSE 0
        END
      )::float / (${totalQSub.getQuery()})
      `,
        'score'
      )
      .innerJoin('question_runs', 'qr', 'qr.quiz_run_id = r.id')
      // Ensure we only count questions that belong to this quiz
      .innerJoin(
        'quizzes_questions',
        'qq',
        'qq.quiz_id = r.quiz_id AND qq.question_id = qr.question_id'
      )
      .innerJoin('questions', 'q', 'q.id = qr.question_id')
      .where('r.quiz_id = :quizId', { quizId })
      .andWhere('r.finished_at IS NOT NULL')
      .groupBy('r.id');

    // Take the average score across all runs
    const avgRow = await this.quizRunRepo
      .createQueryBuilder()
      .select('COALESCE(AVG(sub.score), 0) * 100', 'averageScore')
      .from('(' + perRunSub.getQuery() + ')', 'sub')
      .setParameters(perRunSub.getParameters()) // propagate :quizId
      .getRawOne<{ averageScore: string }>();

    const result: ReadResultQuizDto = {
      quiz: {
        id: Number(quizRow.id),
        title: quizRow.title,
        totalQuestions,
      },
      metrics: {
        completedCount: Number(completedCount ?? 0),
        averageScore: Number(Number(avgRow?.averageScore ?? 0).toFixed(1))
      },
    };

    return result;
  }

}
