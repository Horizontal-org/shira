import { Body, Delete, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';

import {
  TYPES,
} from '../interfaces';

import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { LoggedUser } from 'src/modules/auth/decorators';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';
import { IDeleteQuizService } from '../interfaces/services/delete.quiz.service.interface';

@AuthController('quiz')
export class DeleteQuizController {
  constructor(
    @Inject(TYPES.services.IDeleteQuizService)
    private deleteQuizService: IDeleteQuizService,    
  ) {}

  @Delete(':id')
  @Roles(Role.SpaceAdmin)
  async create(
    @Param('id', ParseIntPipe) id: number,
    @LoggedUser() user: LoggedUserDto,
  ) 
  {    
    await this.deleteQuizService.execute({
        id: id,
        spaceId: user.space.id
    })
  }
}
