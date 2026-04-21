import { Get, Inject, UseGuards } from '@nestjs/common';

import {
  TYPES,
} from '../interfaces';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { IListQuizService } from '../interfaces/services/list.quiz.service.interface';
import { SpaceId } from 'src/modules/auth/decorators';
import { SubscriptionGuard } from 'src/modules/subscription/guards/subscription.guard';
import { SubscriptionDecorator } from 'src/modules/subscription/decorators/subscription.decorator';
import { CachedSubscription } from 'src/modules/subscription/dto/cached-response.dto';

@AuthController('quiz')
export class ListQuizController {
  constructor(
    @Inject(TYPES.services.IListQuizService)
    private listQuizService: IListQuizService,
  ) { }

  @Get()
  @Roles(Role.SpaceAdmin)
  @UseGuards(SubscriptionGuard)
  async list(
    @SpaceId() spaceId: number,
    @SubscriptionDecorator() subscription: Partial<CachedSubscription>
  ) {
    const noSub = !subscription || subscription.status !== 'active' || subscription.type !== 'pro'
    const quizzes = await this.listQuizService.execute(spaceId, !!(noSub))

    if (noSub) {
      // return first three public quizzes
      return quizzes.filter(q => q.visibility === 'public').slice(0, 3)
    }

    return quizzes
  }
}
