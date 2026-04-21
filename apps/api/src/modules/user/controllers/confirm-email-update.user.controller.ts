import { Controller, Inject, Param, Post } from '@nestjs/common';
import { TYPES } from 'src/modules/user/interfaces/types';
import { IConfirmUpdateUserService } from 'src/modules/user/interfaces/services/confirm-update.user.service.interface';

@Controller('user/update')
export class ConfirmEmailUpdateUserController {
  constructor(
    @Inject(TYPES.services.IConfirmEmailUpdateUserService)
    private readonly confirmEmailUpdateAuthService: IConfirmUpdateUserService,
  ) { }

  @Post('email/confirm/:token')
  async confirm(@Param('token') token: string) {
    await this.confirmEmailUpdateAuthService.execute(token);
  }
}
