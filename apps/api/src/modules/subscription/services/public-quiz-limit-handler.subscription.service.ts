import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/modules/question/domain';
import { Quiz } from 'src/modules/quiz/domain/quiz.entity';
import {
  IPublicQuizLimitHandlerService
} from '../interfaces/services/public-quiz-limit-handler.subscription.service.interface';
import { Repository } from 'typeorm';

const MAX_STARTER_PUBLIC_QUIZZES = 3;

@Injectable()
export class PublicQuizLimitHandlerService implements IPublicQuizLimitHandlerService {

  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
  ) { }

  async execute(organizationId: string): Promise<void> {
    const publicQuizIds = await this.quizRepo
      .createQueryBuilder('quiz')
      .leftJoin(
        (qb) =>
          qb
            .from(Question, 'question')
            .innerJoin('quizzes_questions', 'qq', 'qq.questionId = question.id')
            .select('qq.quizId', 'quizId')
            .addSelect('MAX(question.updatedAt)', 'questionUpdatedAt')
            .addSelect('MAX(qq.updatedAt)', 'quizQuestionUpdatedAt')
            .groupBy('qq.quizId'),
        'latest_question',
        'latest_question.quizId = quiz.id'
      )
      .select('quiz.id', 'id')
      .where('space_id IN (SELECT id FROM spaces WHERE organization_id = :organizationId)', {
        organizationId,
      })
      .andWhere('quiz.visibility = :visibility', { visibility: 'public' })
      .orderBy(`GREATEST
        (
          quiz.updated_at,
          COALESCE(latest_question.questionUpdatedAt, '1900-01-01'),
          COALESCE(latest_question.quizQuestionUpdatedAt, '1900-01-01')
        )`,
        'DESC',
      )
      .getRawMany();

    const quizzesToUnpublish = publicQuizIds.slice(MAX_STARTER_PUBLIC_QUIZZES);

    if (quizzesToUnpublish.length > 0) {
      await this.quizRepo
        .createQueryBuilder()
        .update(Quiz)
        .set({ published: false })
        .whereInIds(quizzesToUnpublish.map(({ id }) => Number(id)))
        .execute();
    }
  }
}
