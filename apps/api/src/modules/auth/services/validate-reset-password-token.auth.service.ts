import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordResetEntity } from '../domain/password-reset.entity';
import { ResetPasswordTokenInvalidException } from '../exceptions/reset-password-token-invalid.auth.exception';
import { ResetPasswordTokenUsedException } from '../exceptions/reset-password-token-used.auth.exception';
import { IValidateResetPasswordTokenAuthService } from '../interfaces/services/validate-reset-password-token.auth.service.interface';
import { ApiLogger } from 'src/utils/logger/api-logger.service';
import { ResetPasswordExpiredTokenException } from '../exceptions/reset-password-token-expired.auth.exception';
import { hashResetToken } from 'src/utils/token.utils';

@Injectable()
export class ValidateResetPasswordTokenAuthService implements IValidateResetPasswordTokenAuthService {
  constructor(
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepo: Repository<PasswordResetEntity>,
  ) { }

  private readonly logger = new ApiLogger(ValidateResetPasswordTokenAuthService.name);

  async execute(token: string): Promise<PasswordResetEntity> {
    this.logger.log(`Validating reset password token`);

    const tokenHash = hashResetToken(token);

    const reset = await this.passwordResetRepo.findOne({
      where: { resetHash: tokenHash },
    });

    if (!reset) {
      throw new ResetPasswordTokenInvalidException();
    }

    if (reset.usedAt) {
      throw new ResetPasswordTokenUsedException();
    }

    if (reset.expiresAt.getTime() < new Date().getTime()) {
      throw new ResetPasswordExpiredTokenException();
    }

    this.logger.log(`Reset password token is valid for email: ${reset.email}`);
    return reset;
  }
}
