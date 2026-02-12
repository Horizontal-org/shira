import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { LoginAuthDto } from '../domain/';
import {
  TYPES,
  IValidateAuthService,
  IGenerateTokenAuthService,
} from '../interfaces';
import { IMarkUserLoginService } from 'src/modules/user/interfaces/services/mark.user.login.service.interface';

@Controller('login')
export class LoginAuthController {
  constructor(
    @Inject(TYPES.services.IValidateAuthService)
    private validateAuthService: IValidateAuthService,
    @Inject(TYPES.services.IGenerateTokenAuthService)
    private generateTokenAuthService: IGenerateTokenAuthService,
    @Inject(TYPES.services.IMarkUserLoginService)
    private markUserLoginService: IMarkUserLoginService
  ) {}

  @Post()
  async login(@Body() loginAuthDto: LoginAuthDto, @Res() response: Response) {
    const { email, password } = loginAuthDto;
    const user = await this.validateAuthService.execute({ email, password });
    const authToken = await this.generateTokenAuthService.execute(user);

    response
      .cookie('access_token', authToken.access_token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60),
        domain: process.env.COOKIE_DOMAIN,
      })
      .send({
        ...authToken,
        user,
      });

      await this.markUserLoginService.execute(user.id);
  }
}
