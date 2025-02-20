import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Res } from '@nestjs/common';

import {
  TYPES,
} from '../interfaces';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { LoggedUser } from 'src/modules/auth/decorators';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';
import { IGetByIdQuizService } from '../interfaces/services/get-by-id.quiz.service.interface';

@AuthController('quiz')
export class GetByIdQuizController {
  constructor(
    @Inject(TYPES.services.IGetByIdQuizService)
    private getQuizService: IGetByIdQuizService,
  ) {}

  @Get(':id')
  @Roles(Role.SpaceAdmin)
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @LoggedUser() user: LoggedUserDto
  ) 
  {    
    const quiz = await this.getQuizService.execute(id, user.space.id)
    return quiz
  }
}
