import { Inject, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { TYPES } from '../interfaces/types';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { IGetResultQuizService } from '../interfaces/services/get-result.quiz.service.interface';
import { SpaceId } from 'src/modules/auth/decorators/space-id.decorator';
import { IValidateSpaceQuizService } from '../../quiz/interfaces/services/validate-space.quiz.service.interface';

@AuthController('quiz')
export class GetResultQuizController {
  constructor(
    @Inject(TYPES.services.IGetResultQuizService)
    private getResultQuizService: IGetResultQuizService,
    @Inject(TYPES.services.IValidateSpaceQuizService)
    private getValidateSpaceQuizService: IValidateSpaceQuizService
  ) { }

  @Get('/:quizId/results')
  @Roles(Role.SpaceAdmin)
  async getResultById(
    @Param('quizId', ParseIntPipe) quizId: number,
    @SpaceId() spaceId: number
  ) {
    await this.getValidateSpaceQuizService.execute(spaceId, quizId);
    return this.getResultQuizService.execute(quizId, spaceId);
  }
}