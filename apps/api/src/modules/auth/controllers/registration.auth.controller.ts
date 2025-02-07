import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import {
    ISubmitRegistrationAuthService,
    IValidateRegistrationAuthService,
  TYPES,
} from '../interfaces';
import { RegisterAuthDto } from '../domain/register.auth.dto';

@Controller('register')
export class RegisterAuthController {
  constructor(
    @Inject(TYPES.services.IValidateRegistrationAuthService)
    private validateAuthService: IValidateRegistrationAuthService,
    @Inject(TYPES.services.ISubmitRegistrationAuthService)
    private registerAuthService: ISubmitRegistrationAuthService,
  ) {}

  @Post()
  async register(@Body() registerDto: RegisterAuthDto) {
    // if error will throw exception
    await this.validateAuthService.execute(registerDto)

    // creates table and sends email
    await this.registerAuthService.execute(registerDto)

    return
  }
}
