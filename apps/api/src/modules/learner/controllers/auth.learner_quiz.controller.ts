import { Get, Inject, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { SpaceId } from 'src/modules/auth/decorators';
import { TYPES as QUIZ_TYPES} from '../../quiz/interfaces'
import { IValidateSpaceQuizService } from 'src/modules/quiz/interfaces/services/validate-space.quiz.service.interface';
import { IGetAssignedLearnerService } from '../interfaces/services/get-assigned.learner.service.interface';
import { IGetUnassignedLearnerService } from '../interfaces/services/get-unassigned.learner.service.interface';
import { SubscriptionGuard } from 'src/modules/subscription/guards/subscription.guard';
import { TYPES as SUB_TYPES } from 'src/modules/subscription/interfaces/types';
import { IValidateSubscriptionService } from 'src/modules/subscription/interfaces/services/validate.subscription.service';
import { SubscriptionDecorator } from 'src/modules/subscription/decorators/subscription.decorator';
import { CachedSubscription } from 'src/modules/subscription/dto/cached-response.dto';

@AuthController('learner-quiz')
export class AuthLearnerQuizController {
  constructor(
    @Inject(QUIZ_TYPES.services.IValidateSpaceQuizService)
    private readonly validateSpaceQuizService: IValidateSpaceQuizService,
    @Inject(TYPES.services.IGetAssignedLearnerService)
    private readonly getAssignedLearnerService: IGetAssignedLearnerService,
    @Inject(TYPES.services.IGetUnassignedLearnerService)
    private readonly getUnassignedLearnerService: IGetUnassignedLearnerService,
    @Inject(SUB_TYPES.services.IValidateSubscriptionService)
    private readonly validateSubscriptionService: IValidateSubscriptionService
  ) { }

  @Get('assignments/:quizId')
  @Roles(Role.SpaceAdmin)
  @UseGuards(SubscriptionGuard)
  async getAssignedLearners(
    @SpaceId() spaceId: number,
    @Param('quizId', ParseIntPipe) quizId: number,
    @SubscriptionDecorator() subscription?: CachedSubscription
  ) {
    await this.validateSpaceQuizService.execute(spaceId, quizId)

    await this.validateSubscriptionService.execute(subscription)

    return await this.getAssignedLearnerService.execute(quizId)
  }

  @Get('unassignments/:quizId')
  @Roles(Role.SpaceAdmin)
  @UseGuards(SubscriptionGuard)
  async getUnassignedLearners(
    @SpaceId() spaceId: number,
    @Param('quizId', ParseIntPipe) quizId: number,
    @SubscriptionDecorator() subscription?: CachedSubscription
  ) {
    await this.validateSpaceQuizService.execute(spaceId, quizId)
    
    await this.validateSubscriptionService.execute(subscription)

    return await this.getUnassignedLearnerService.execute(quizId, spaceId)
  }
}

