import { Delete, Inject, Param, ParseIntPipe } from '@nestjs/common';

import {
  TYPES,
} from '../interfaces';

import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { SpaceId } from 'src/modules/auth/decorators';
import { IDeleteQuizService } from '../interfaces/services/delete.quiz.service.interface';

@AuthController('quiz')
export class DeleteQuizController {
  constructor(
    @Inject(TYPES.services.IDeleteQuizService)
    private deleteQuizService: IDeleteQuizService,    
  ) {}

  @Delete(':id')
  @Roles(Role.SpaceAdmin)
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @SpaceId() spaceId: number
  ) 
  {  
    await this.deleteQuizService.execute({
        id: id,
        spaceId: spaceId
    })
  }
}
