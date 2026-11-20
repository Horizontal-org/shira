import { Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { authCookieOptions } from '../cookie-options';

@Controller('logout')
export class LogoutAuthController {
  @Post()
  logout(@Res() response: Response) {
    console.log('[AUTH] logout - clearing httpOnly cookie');
    const clearOptions = {
      ...authCookieOptions(),
      expires: new Date(0),
    };

    response
      .cookie('access_token', '', clearOptions)
      .cookie('active_space', '', clearOptions)
      .send();
  }
}
