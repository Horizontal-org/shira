import { Body, Inject, Post, UseGuards } from '@nestjs/common';

import {
  TYPES,
} from '../interfaces';

import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { ICreateQuizService } from '../interfaces/services/create.quiz.service.interface';
import { CreateQuizDto } from '../dto/create.quiz.dto';
import { LoggedUser } from 'src/modules/auth/decorators';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';
import { SubscriptionGuard } from 'src/modules/subscription/guards/subscription.guard';
import { SubscriptionDecorator } from 'src/modules/subscription/decorators/subscription.decorator';
import { CachedSubscription } from 'src/modules/subscription/dto/cached-response.dto';
import { IValidateCreateQuizService } from '../interfaces/services/validate-create.quiz.service.interface';

@AuthController('quiz')
export class CreateQuizController {
  constructor(
    @Inject(TYPES.services.ICreateQuizService)
    private createQuizService: ICreateQuizService,
    @Inject(TYPES.services.IValidateCreateQuizService)
    private validateQuizService: IValidateCreateQuizService,
  ) { }

  @Post()
  @Roles(Role.SpaceAdmin)
  @UseGuards(SubscriptionGuard)
  async create(
    @LoggedUser() user: LoggedUserDto,
    @Body() createDto: CreateQuizDto,
    @SubscriptionDecorator() subscription?: CachedSubscription
  ) {
    createDto.space = user.activeSpace.space

    await this.validateQuizService.execute(subscription, createDto.visibility, createDto.space.id)

    await this.createQuizService.execute(createDto)
  }
}
