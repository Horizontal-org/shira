import { Controller, Inject, Param, Post } from '@nestjs/common';
import { TYPES } from '../interfaces/types';
import { IConfirmUpdateAuthService } from '../interfaces/services/update-space.auth.service.interface';

@Controller('space/update')
export class ConfirmEmailUpdateAuthController {
  constructor(
    @Inject(TYPES.services.IConfirmEmailUpdateAuthService)
    private confirmEmailUpdateAuthService: IConfirmUpdateAuthService,
  ) { }

  @Post('email/confirm/:token')
  async confirm(@Param('token') token: string) {
    await this.confirmEmailUpdateAuthService.execute(token);
  }
}
