import { Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('logout')
export class LogoutAuthController {
  @Post()
  logout(@Res() response: Response) {
    console.log('[AUTH] logout - clearing httpOnly cookie');
    const clearOptions = {
      expires: new Date(0),
      httpOnly: true,
      domain: process.env.COOKIE_DOMAIN,
    };

    response
      .cookie('access_token', '', clearOptions)
      .cookie('active_space', '', clearOptions)
      .send();
  }
}
