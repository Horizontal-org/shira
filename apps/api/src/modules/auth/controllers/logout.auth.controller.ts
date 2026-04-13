import { Controller, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('logout')
export class LogoutAuthController {
  @Post()
  logout(@Res() response: Response) {
    response
      .cookie('access_token', '', {
        expires: new Date(0),
        httpOnly: true,
        domain: process.env.COOKIE_DOMAIN,
      })
      .send();
  }
}
