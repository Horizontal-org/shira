import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IConfirmPasswordResetAuthService, IRequestPasswordResetAuthService, TYPES } from '../interfaces';
import { ResetPasswordAuthDto } from '../domain/reset-password.auth.dto';
import { ConfirmResetPasswordAuthDto } from '../domain/confirm-reset-password.auth.dto';

@Controller('reset-password')
export class ResetPasswordAuthController {
  constructor(
    @Inject(TYPES.services.IRequestPasswordResetAuthService)
    private readonly requestPasswordResetService: IRequestPasswordResetAuthService,
    @Inject(TYPES.services.IConfirmPasswordResetAuthService)
    private readonly confirmPasswordResetService: IConfirmPasswordResetAuthService,
  ) { }

  @Post()
  async requestReset(@Body() dto: ResetPasswordAuthDto) {
    await this.requestPasswordResetService.execute(dto);
  }

  @Post('confirm')
  async confirmReset(@Body() dto: ConfirmResetPasswordAuthDto) {
    await this.confirmPasswordResetService.execute(dto);
  }
}
