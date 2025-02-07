import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { LoginAuthDto } from '../domain/';
import {
  TYPES,
  IValidateAuthService,
  IGenerateTokenAuthService,
} from '../interfaces';

@Controller('login')
export class LoginAuthController {
  constructor(
    @Inject(TYPES.services.IValidateAuthService)
    private validateAuthService: IValidateAuthService,
    @Inject(TYPES.services.IGenerateTokenAuthService)
    private generateTokenAuthService: IGenerateTokenAuthService,
  ) {}

  @Post()
  async login(@Body() loginAuthDto: LoginAuthDto, @Res() response: Response) {
    const { email, password } = loginAuthDto;
    const user = await this.validateAuthService.execute({ email, password });
    const authToken = await this.generateTokenAuthService.execute(user);

    response
      .cookie('access_token', authToken.access_token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        domain: process.env.COOKIE_DOMAIN,
      })
      .send({
        ...authToken,
        user,
      });
  }
}
