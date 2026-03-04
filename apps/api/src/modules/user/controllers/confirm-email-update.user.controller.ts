import { Controller, Inject, Param, Post } from '@nestjs/common';
import { TYPES } from 'src/modules/auth/interfaces/types';
import { IConfirmUpdateAuthService } from 'src/modules/auth/interfaces/services/confirm-update-space.auth.service.interface';

@Controller('user/update')
export class ConfirmEmailUpdateUserController {
  constructor(
    @Inject(TYPES.services.IConfirmEmailUpdateAuthService)
    private readonly confirmEmailUpdateAuthService: IConfirmUpdateAuthService,
  ) { }

  @Post('email/confirm/:token')
  async confirm(@Param('token') token: string) {
    await this.confirmEmailUpdateAuthService.execute(token);
  }
}
