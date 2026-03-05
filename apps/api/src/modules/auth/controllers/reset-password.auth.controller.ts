import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ResetPasswordAuthDto } from '../domain/reset-password.auth.dto';
import { ConfirmResetPasswordAuthDto } from '../domain/confirm-reset-password.auth.dto';
import { TYPES as AuthTYPES } from '../interfaces';
import { TYPES as UserTYPES } from 'src/modules/user/interfaces';
import { IConfirmPasswordResetAuthService } from '../interfaces/services/confirm-reset-password.auth.service.interface';
import { IValidateResetPasswordTokenAuthService } from '../interfaces/services/validate-reset-password-token.auth.service.interface';
import { ResetPasswordEmailSendFailedException } from '../exceptions/reset-password-email-send.auth.exception';
import { ResetPasswordTokenInvalidException } from '../exceptions/reset-password-token-invalid.auth.exception';
import { IRequestPasswordResetUserService } from 'src/modules/user/interfaces/services/request-password-reset.user.service.interface';

@Controller('reset-password')
export class ResetPasswordAuthController {
  constructor(
    @Inject(UserTYPES.services.IRequestPasswordResetUserService)
    private readonly requestPasswordResetService: IRequestPasswordResetUserService,
    @Inject(AuthTYPES.services.IConfirmPasswordResetAuthService)
    private readonly confirmPasswordResetService: IConfirmPasswordResetAuthService,
    @Inject(AuthTYPES.services.IValidateResetPasswordTokenAuthService)
    private readonly validateResetPasswordTokenService: IValidateResetPasswordTokenAuthService,
  ) { }

  @Post()
  async requestReset(@Body() dto: ResetPasswordAuthDto) {
    try {
      return await this.requestPasswordResetService.execute(dto);
    } catch (e) {
      throw new ResetPasswordEmailSendFailedException();
    }
  }

  @Get('validate/:token')
  async validateToken(@Param('token') token: string) {
    try {
      await this.validateResetPasswordTokenService.execute(token);
    } catch (e) {
      throw new ResetPasswordTokenInvalidException();
    }
  }

  @Post('confirm/:token')
  async confirmReset(
    @Param('token') token: string,
    @Body() dto: ConfirmResetPasswordAuthDto,
  ) {
    await this.confirmPasswordResetService.execute(dto, token);
  }
}
