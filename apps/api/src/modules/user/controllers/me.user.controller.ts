import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LoggedUser } from 'src/modules/auth/decorators';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { ReadUserDto } from '../dto/read.user.dto';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from '../domain/role.enum';

@AuthController('user')
export class MeUserController {
  constructor() {}

  @Get()
  @Roles(Role.SpaceAdmin)
  async me(@LoggedUser() user: ReadUserDto) {
    return user
  }
}
