import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfirmResetPasswordAuthDto } from '../domain/confirm-reset-password.auth.dto';
import { PasswordResetEntity } from '../domain/password-reset.entity';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { hashPassword } from 'src/utils/password.utils';
import { ResetPasswordTokenExpiredException } from '../exceptions/reset-password-token-expired.auth.exception';
import { ResetPasswordTokenInvalidException } from '../exceptions/reset-password-token-invalid.auth.exception';
import { ResetPasswordTokenUsedException } from '../exceptions/reset-password-token-used.auth.exception';
import { ResetPasswordUserNotFoundException } from '../exceptions/reset-password-user-not-found.auth.exception';
import { ResetPasswordWeakException } from '../exceptions/reset-password-weak.auth.exception';
import { ApiLogger } from 'src/modules/learner/logger/api-logger.service';
import { IConfirmPasswordResetAuthService } from '../interfaces/services/confirm-reset-password.auth.service.interface';

const MINIMUM_PASSWORD_LENGTH = 8;

@Injectable()
export class ConfirmResetPasswordAuthService implements IConfirmPasswordResetAuthService {
  constructor(
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepo: Repository<PasswordResetEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  private readonly logger = new ApiLogger(ConfirmResetPasswordAuthService.name);

  async execute(confirmResetPasswordData: ConfirmResetPasswordAuthDto): Promise<void> {
    this.logger.log(`Processing password reset confirmation`);

    if (!confirmResetPasswordData.password
      || confirmResetPasswordData.password.length < MINIMUM_PASSWORD_LENGTH) {
      throw new ResetPasswordWeakException();
    }

    const reset = await this.passwordResetRepo.findOne({
      where: { resetHash: confirmResetPasswordData.token },
    });

    if (!reset) {
      throw new ResetPasswordTokenInvalidException();
    }

    if (reset.usedAt) {
      throw new ResetPasswordTokenUsedException();
    }

    if (reset.expiresAt.getTime() < new Date().getTime()) {
      throw new ResetPasswordTokenExpiredException();
    }

    const user = await this.userRepo.findOne({
      where: { id: reset.userId },
    });

    if (!user) {
      throw new ResetPasswordUserNotFoundException();
    }

    user.password = await hashPassword(confirmResetPasswordData.password);
    await this.userRepo.save(user);

    reset.usedAt = new Date();
    await this.passwordResetRepo.save(reset);

    this.logger.log(`Password successfully reset for user with email: ${user.email}`);
  }
}
