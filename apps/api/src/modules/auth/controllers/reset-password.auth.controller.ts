import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ResetPasswordAuthDto } from '../domain/reset-password.auth.dto';
import { ConfirmResetPasswordAuthDto } from '../domain/confirm-reset-password.auth.dto';
import { ApiLogger } from 'src/modules/learner/logger/api-logger.service';
import { RequestPasswordResetAuthService } from '../services/request-password-reset.auth.service';
import { ConfirmResetPasswordAuthService } from '../services/confirm-reset-password.auth.service';
import { ResetPasswordEmailSendFailedException } from '../exceptions/reset-password-email-send.auth.exception';
import { TYPES } from '../interfaces';
import { IConfirmPasswordResetAuthService } from '../interfaces/services/confirm-reset-password.auth.service.interface';
import { IRequestPasswordResetAuthService } from '../interfaces/services/request-password-reset.auth.service.interface';

@Controller('reset-password')
export class ResetPasswordAuthController {
  constructor(
    @Inject(TYPES.services.IRequestPasswordResetAuthService)
    private readonly requestPasswordResetService: IRequestPasswordResetAuthService,
    @Inject(TYPES.services.IConfirmPasswordResetAuthService)
    private readonly confirmPasswordResetService: IConfirmPasswordResetAuthService,
  ) { }

  private readonly logger = new ApiLogger(ResetPasswordAuthController.name);

  @Post()
  async requestReset(@Body() dto: ResetPasswordAuthDto) {
    try {
      return await this.requestPasswordResetService.execute(dto);
    } catch (e) {
      this.logger.error("Failed to enqueue password reset email", e);
      throw new ResetPasswordEmailSendFailedException();
    }
  }

  @Post('confirm')
  async confirmReset(@Body() dto: ConfirmResetPasswordAuthDto) {
    await this.confirmPasswordResetService.execute(dto);
  }
}
