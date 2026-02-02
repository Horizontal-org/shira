import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfirmResetPasswordAuthDto } from '../domain/confirm-reset-password.auth.dto';
import { PasswordResetEntity } from '../domain/password-reset.entity';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { hashPassword } from 'src/utils/password.utils';
import { ResetPasswordWeakException } from '../exceptions/reset-password-weak.auth.exception';
import { ApiLogger } from 'src/utils/logger/api-logger.service';
import { IConfirmPasswordResetAuthService } from '../interfaces/services/confirm-reset-password.auth.service.interface';
import { ResetPasswordConfirmationMismatchException } from '../exceptions/reset-password-confirmation-mismatch.auth.exception';
import { ResetPasswordTokenInvalidException } from '../exceptions/reset-password-token-invalid.auth.exception';

const MINIMUM_PASSWORD_LENGTH = 8;

@Injectable()
export class ConfirmResetPasswordAuthService implements IConfirmPasswordResetAuthService {
  constructor(
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepo: Repository<PasswordResetEntity>
  ) { }

  private readonly logger = new ApiLogger(ConfirmResetPasswordAuthService.name);

  async execute(dto: ConfirmResetPasswordAuthDto, token: string): Promise<void> {
    this.logger.log(`Processing password reset confirmation`);

    await this.passwordResetRepo.manager.transaction(async (entityManager) => {

      if (!dto.newPassword || dto.newPassword.length < MINIMUM_PASSWORD_LENGTH) {
        throw new ResetPasswordWeakException();
      }

      if (dto.newPassword !== dto.confirmNewPassword) {
        throw new ResetPasswordConfirmationMismatchException();
      }

      const reset = await entityManager.findOne(PasswordResetEntity, {
        where: { resetHash: token },
      });

      if (!reset || reset.usedAt || reset.expiresAt < new Date()) {
        throw new ResetPasswordTokenInvalidException();
      }

      const user = await entityManager.findOne(UserEntity, {
        where: { id: reset.userId }
      });

      if (!user) {
        throw new ResetPasswordTokenInvalidException();
      }

      user.password = await hashPassword(dto.newPassword);
      reset.usedAt = new Date();

      await entityManager.save(UserEntity, user);
      await entityManager.save(PasswordResetEntity, reset);

      this.logger.log(`Password successfully reset for user with email: ${user.email}`);
    });
  }
}
