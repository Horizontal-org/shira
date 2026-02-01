import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Param, Post } from '@nestjs/common';
import { ResetPasswordAuthDto } from '../domain/reset-password.auth.dto';
import { ConfirmResetPasswordAuthDto } from '../domain/confirm-reset-password.auth.dto';
import { ApiLogger } from 'src/modules/learner/logger/api-logger.service';
import { ResetPasswordEmailSendFailedException } from '../exceptions/reset-password-email-send.auth.exception';
import { TYPES } from '../interfaces';
import { IConfirmPasswordResetAuthService } from '../interfaces/services/confirm-reset-password.auth.service.interface';
import { IRequestPasswordResetAuthService } from '../interfaces/services/request-password-reset.auth.service.interface';
import { IValidateResetPasswordTokenAuthService } from '../interfaces/services/validate-reset-password-token.auth.service.interface';

@Controller('reset-password')
export class ResetPasswordAuthController {
  constructor(
    @Inject(TYPES.services.IRequestPasswordResetAuthService)
    private readonly requestPasswordResetService: IRequestPasswordResetAuthService,
    @Inject(TYPES.services.IConfirmPasswordResetAuthService)
    private readonly confirmPasswordResetService: IConfirmPasswordResetAuthService,
    @Inject(TYPES.services.IValidateResetPasswordTokenAuthService)
    private readonly validateResetPasswordTokenService: IValidateResetPasswordTokenAuthService,
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

  @Post('confirm/:token')
  async confirmReset(
    @Param('token') token: string,
    @Body() dto: ConfirmResetPasswordAuthDto,
  ) {
    await this.confirmPasswordResetService.execute(dto, token);
  }

  @Get('validate/:token')
  async validateToken(@Param('token') token: string) {
    await this.validateResetPasswordTokenService.execute(token);
  }
}
