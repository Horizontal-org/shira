import { Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { SpaceId } from 'src/modules/auth/decorators';
import { ApiLogger } from '../logger/api-logger.service';
import { TYPES as QUIZ_TYPES} from '../../quiz/interfaces'
import { IValidateSpaceQuizService } from 'src/modules/quiz/interfaces/services/validate-space.quiz.service.interface';
import { IGetAssignedLearnerService } from '../interfaces/services/get-assigned.learner.service.interface';
import { IGetFreeLearnerService } from '../interfaces/services/get-free.learner.service.interface';

@AuthController('learner-quiz')
export class AuthLearnerQuizController {
  constructor(
    @Inject(QUIZ_TYPES.services.IValidateSpaceQuizService)
    private readonly validateSpaceQuizService: IValidateSpaceQuizService,
    @Inject(TYPES.services.IGetAssignedLearnerService)
    private readonly getAssignedLearnerService: IGetAssignedLearnerService,
    @Inject(TYPES.services.IGetFreeLearnerService)
    private readonly getFreeLearnerService: IGetFreeLearnerService
  ) { }

  @Get('assignments/:quizId')
  @Roles(Role.SpaceAdmin)
  async getAssignedLearners(
    @SpaceId() spaceId: number,
    @Param('quizId', ParseIntPipe) quizId: number,
  ){
    await this.validateSpaceQuizService.execute(spaceId, quizId)

    return await this.getAssignedLearnerService.execute(quizId)
  }

  @Get('free/:quizId')
  @Roles(Role.SpaceAdmin)
  async getFreeLearners(
    @SpaceId() spaceId: number,
    @Param('quizId', ParseIntPipe) quizId: number,
  ){
    await this.validateSpaceQuizService.execute(spaceId, quizId)

    return await this.getFreeLearnerService.execute(quizId, spaceId)
  }
}

