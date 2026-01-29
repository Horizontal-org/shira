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
import { IConfirmPasswordResetAuthService } from '../interfaces/services/confirm-reset-password.auth.service.interface';

@Injectable()
export class ConfirmResetPasswordAuthService implements IConfirmPasswordResetAuthService {
  constructor(
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepo: Repository<PasswordResetEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  async execute(confirmResetPasswordData: ConfirmResetPasswordAuthDto): Promise<void> {
    if (!confirmResetPasswordData.password || confirmResetPasswordData.password.length < 8) {
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
      where: { email: reset.email },
    });

    if (!user) {
      throw new ResetPasswordUserNotFoundException();
    }

    user.password = await hashPassword(confirmResetPasswordData.password);
    await this.userRepo.save(user);

    reset.usedAt = new Date();
    await this.passwordResetRepo.save(reset);
  }
}
