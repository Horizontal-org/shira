import { Controller, Get, Inject, Query } from '@nestjs/common';

import {
  IConfirmRegistrationAuthService,
  TYPES,
} from '../interfaces';

@Controller('confirm')
export class ConfirmAuthController {
  constructor(
    @Inject(TYPES.services.IConfirmRegistrationAuthService)
    private confirmAuthService: IConfirmRegistrationAuthService,
  ) { }

  @Get('')
  async register(@Query('hash') hash: string) {

    await this.confirmAuthService.execute(hash)

    return
  }
}
