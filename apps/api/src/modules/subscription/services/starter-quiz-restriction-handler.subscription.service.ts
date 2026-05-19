import { Injectable } from '@nestjs/common';
import { ApiLogger } from 'src/utils/logger/api-logger.service';
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

  private readonly logger = new ApiLogger(StarterQuizRestrictionHandlerService.name);

  async execute(organizationId: string, spaceId: number): Promise<void> {
    this.logger.debug(`Unpublishing quizzes for organization ${organizationId}`);
    await this.unpublishPublicQuizzes(organizationId, spaceId);
    await this.unpublishPrivateQuizzes(organizationId);
  }

  private async unpublishPublicQuizzes(organizationId: string, spaceId: number) {
    const publicQuizIds = await this.quizRepo
      .createQueryBuilder('quiz')
      .select('quiz.id', 'id')
      .where('space_id = :spaceId', { spaceId })
      .andWhere('quiz.visibility = :visibility', { visibility: 'public' })
      .orderBy('quiz.created_at', 'DESC')
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

