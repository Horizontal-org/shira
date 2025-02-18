import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';

import {
  TYPES,
} from '../interfaces';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { IListQuizService } from '../interfaces/services/list.quiz.service.interface';
import { LoggedUser } from 'src/modules/auth/decorators';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';

@AuthController('quiz')
export class ListQuizController {
  constructor(
    @Inject(TYPES.services.IListQuizService)
    private listQuizService: IListQuizService,
  ) {}

  @Get()
  @Roles(Role.SpaceAdmin)
  async list(
    @LoggedUser() user: LoggedUserDto
  ) 
  {    
    const quizzes = await this.listQuizService.execute(user.space.id)
    return quizzes
  }
}
