import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfirmResetPasswordAuthDto } from '../domain/confirm-reset-password.auth.dto';
import { PasswordResetEntity } from '../domain/password-reset.entity';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { hashPassword } from 'src/utils/password.utils';
import { ResetPasswordWeakException } from '../exceptions/reset-password-weak.auth.exception';
import { ApiLogger } from 'src/modules/learner/logger/api-logger.service';
import { IConfirmPasswordResetAuthService } from '../interfaces/services/confirm-reset-password.auth.service.interface';
import { ResetPasswordConfirmationMismatchException } from '../exceptions/reset-password-confirmation-mismatch.auth.exception';
import { ResetPasswordTokenInvalidException } from '../exceptions/reset-password-token-invalid.auth.exception';
import { IValidateResetPasswordTokenAuthService, TYPES } from '../interfaces';

const MINIMUM_PASSWORD_LENGTH = 8;

@Injectable()
export class ConfirmResetPasswordAuthService implements IConfirmPasswordResetAuthService {
  constructor(
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepo: Repository<PasswordResetEntity>,
    @Inject(TYPES.services.IValidateResetPasswordTokenAuthService)
    private readonly validateResetPasswordTokenService: IValidateResetPasswordTokenAuthService,
  ) { }

  private readonly logger = new ApiLogger(ConfirmResetPasswordAuthService.name);

  async execute(dto: ConfirmResetPasswordAuthDto, token: string): Promise<void> {
    this.logger.log(`Processing password reset confirmation`);

    await this.passwordResetRepo.manager.transaction(async (entityManager) => {
      const reset = await this.validateResetPasswordTokenService.execute(token, entityManager);

      if (!dto.newPassword || dto.newPassword.length < MINIMUM_PASSWORD_LENGTH) {
        throw new ResetPasswordWeakException();
      }

      if (dto.newPassword !== dto.confirmNewPassword) {
        throw new ResetPasswordConfirmationMismatchException();
      }

      const user = await entityManager.findOne(UserEntity, {
        where: { id: reset.userId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!user) {
        throw new ResetPasswordTokenInvalidException();
      }

      const now = new Date();
      user.password = await hashPassword(dto.newPassword);
      reset.usedAt = now;

      await entityManager.save(UserEntity, user);
      await entityManager.save(PasswordResetEntity, reset);

      this.logger.log(`Password successfully reset for user with email: ${user.email}`);
    });
  }
}
