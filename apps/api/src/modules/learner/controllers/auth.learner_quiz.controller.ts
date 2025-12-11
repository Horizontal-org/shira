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
import { IGetUnassignedLearnerService } from '../interfaces/services/get-unassigned.learner.service.interface';

@AuthController('learner-quiz')
export class AuthLearnerQuizController {
  constructor(
    @Inject(QUIZ_TYPES.services.IValidateSpaceQuizService)
    private readonly validateSpaceQuizService: IValidateSpaceQuizService,
    @Inject(TYPES.services.IGetAssignedLearnerService)
    private readonly getAssignedLearnerService: IGetAssignedLearnerService,
    @Inject(TYPES.services.IGetUnassignedLearnerService)
    private readonly getUnassignedLearnerService: IGetUnassignedLearnerService
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

  @Get('unassignments/:quizId')
  @Roles(Role.SpaceAdmin)
  async getFreeLearners(
    @SpaceId() spaceId: number,
    @Param('quizId', ParseIntPipe) quizId: number,
  ){
    await this.validateSpaceQuizService.execute(spaceId, quizId)

    return await this.getUnassignedLearnerService.execute(quizId, spaceId)
  }
}

