import { Body, Controller, Inject, Post, Res, UnauthorizedException } from '@nestjs/common';

import {
  TYPES,
} from '../interfaces';

import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { ICreateQuizService } from '../interfaces/services/create.quiz.service.interface';
import { CreateQuizDto } from '../dto/create.quiz.dto';
import { LoggedUser } from 'src/modules/auth/decorators';
import { ReadUserDto } from 'src/modules/user/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';

@AuthController('quiz')
export class CreateQuizController {
  constructor(
    @Inject(TYPES.services.ICreateQuizService)
    private createQuizService: ICreateQuizService,
    @InjectRepository(SpaceEntity)
    private readonly spaceRepository: Repository<SpaceEntity>,
  ) {}

  @Post()
  @Roles(Role.SpaceAdmin)
  async create(
    @LoggedUser() user: LoggedUserDto,
    @Body() createDto: CreateQuizDto
  ) 
  {    
    createDto.space = user.space    
    console.log("🚀 ~ CreateQuizController ~ createDto:", createDto)
    await this.createQuizService.execute(createDto)
  }
}
