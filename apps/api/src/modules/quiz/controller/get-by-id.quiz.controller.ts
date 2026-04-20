import { ForbiddenException, Get, Inject, Param, ParseIntPipe, UseGuards } from '@nestjs/common';

import {
  TYPES,
} from '../interfaces';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { SpaceId } from 'src/modules/auth/decorators';
import { IGetByIdQuizService } from '../interfaces/services/get-by-id.quiz.service.interface';
import { SubscriptionGuard } from 'src/modules/subscription/guards/subscription.guard';
import { CachedSubscription } from 'src/modules/subscription/dto/cached-response.dto';
import { SubscriptionDecorator } from 'src/modules/subscription/decorators/subscription.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz as QuizEntity} from '../domain/quiz.entity';
import { Repository } from 'typeorm';

@AuthController('quiz')
export class GetByIdQuizController {
  constructor(
    @Inject(TYPES.services.IGetByIdQuizService)
    private getQuizService: IGetByIdQuizService,
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) {}

  @Get(':id')
  @Roles(Role.SpaceAdmin)
  @UseGuards(SubscriptionGuard)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @SpaceId() spaceId: number,
    @SubscriptionDecorator() subscription: Partial<CachedSubscription>
  ) 
  { 
    const noSub = !subscription || subscription.status !== 'active' || subscription.type !== 'pro'
    const quiz = await this.getQuizService.execute(id, spaceId)

    if (noSub) {
      //check quiz is on last 3 and public
      const isStarterQuiz = await this.validateStarterQuizzes(quiz.id, spaceId)
      if (!isStarterQuiz) {
        throw new ForbiddenException('Access denied. Please subscribe to access this quiz.')
      }
    }

    return quiz
  }

  private async validateStarterQuizzes(quizId: string, spaceId: number): Promise<boolean> {
    const quizzes = await this.quizRepo
      .createQueryBuilder('quiz')
      .select('quiz.id')
      .where('quiz.visibility = :visibility', { visibility: 'public' })
      .andWhere('space_id = :spaceId', { spaceId }) 
      .orderBy('quiz.created_at', 'DESC')
      .limit(3)
      .getMany();

    const isStarterQuiz = quizzes.some(q => q.id === parseInt(quizId));
    return isStarterQuiz;
  }
}
