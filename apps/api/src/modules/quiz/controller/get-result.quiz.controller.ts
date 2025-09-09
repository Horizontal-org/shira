import { Inject, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { TYPES } from '../interfaces';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { IGetResultQuizService } from '../interfaces/services/get-result.quiz.service.interface';

@AuthController('quiz')
export class GetResultQuizController {
  constructor(
    @Inject(TYPES.services.IGetResultQuizService)
    private getResultQuizService: IGetResultQuizService
  ) { }

  @Get('/:id/results')
  @Roles(Role.SpaceAdmin)
  async getResultById(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.getResultQuizService.execute(id);
  }
}
