import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/modules/question/domain';
import { Quiz } from 'src/modules/quiz/domain/quiz.entity';
import {
  IStarterQuizRestrictionHandlerService
} from '../interfaces/services/starter-quiz-restriction-handler.subscription.service.interface';
import { Repository } from 'typeorm';

const MAX_STARTER_PUBLIC_QUIZZES = 3;

@Injectable()
export class StarterQuizRestrictionHandlerService implements IStarterQuizRestrictionHandlerService {

  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
  ) { }

  async execute(organizationId: string): Promise<void> {
    await this.unpublishPublicQuizzes(organizationId);
    await this.unpublishPrivateQuizzes(organizationId);
  }

  private async unpublishPublicQuizzes(organizationId: string) {
    const publicQuizIds = await this.quizRepo
      .createQueryBuilder('quiz')
      .leftJoin(
        (qb) => qb
          .from(Question, 'question')
          .innerJoin('quizzes_questions', 'qq', 'qq.question_id = question.id')
          .select('qq.quiz_id', 'quizId')
          .addSelect('MAX(question.updated_at)', 'questionUpdatedAt')
          .addSelect('MAX(qq.updated_at)', 'quizQuestionUpdatedAt')
          .groupBy('qq.quiz_id'),
        'latest_question',
        'latest_question.quizId = quiz.id'
      )
      .select('quiz.id', 'id')
      .where('space_id IN (SELECT id FROM spaces WHERE organization_id = :organizationId)', {
        organizationId,
      })
      .andWhere('quiz.visibility = :visibility', { visibility: 'public' })
      .andWhere('quiz.published = :published', { published: true })
      .orderBy(`GREATEST
        (
          quiz.updated_at,
          COALESCE(latest_question.questionUpdatedAt, '1900-01-01'),
          COALESCE(latest_question.quizQuestionUpdatedAt, '1900-01-01')
        )`,
        'DESC'
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

  private async unpublishPrivateQuizzes(organizationId: string) {
    await this.quizRepo
      .createQueryBuilder()
      .update(Quiz)
      .set({ published: false })
      .where('space_id IN (SELECT id FROM spaces WHERE organization_id = :organizationId)', {
        organizationId,
      })
      .andWhere('visibility = :visibility', { visibility: 'private' })
      .andWhere('published = :published', { published: true })
      .execute();
  }
}

