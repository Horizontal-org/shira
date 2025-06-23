import { Body, Controller, Get, Inject, Post, Res, UnauthorizedException } from '@nestjs/common';

import {
  TYPES,
} from '../interfaces';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { IListQuizService } from '../interfaces/services/list.quiz.service.interface';
import { SpaceId } from 'src/modules/auth/decorators';

@AuthController('quiz')
export class ListQuizController {
  constructor(
    @Inject(TYPES.services.IListQuizService)
    private listQuizService: IListQuizService,
  ) {}

  @Get()
  @Roles(Role.SpaceAdmin)
  async list(
    @SpaceId() spaceId: number
  ) 
  { 
    const quizzes = await this.listQuizService.execute(spaceId)
    return quizzes
  }
}
