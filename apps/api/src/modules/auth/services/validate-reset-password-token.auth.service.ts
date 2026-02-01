import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PasswordResetEntity } from '../domain/password-reset.entity';
import { ResetPasswordTokenExpiredException } from '../exceptions/reset-password-token-expired.auth.exception';
import { ResetPasswordTokenInvalidException } from '../exceptions/reset-password-token-invalid.auth.exception';
import { ResetPasswordTokenUsedException } from '../exceptions/reset-password-token-used.auth.exception';
import { IValidateResetPasswordTokenAuthService } from '../interfaces/services/validate-reset-password-token.auth.service.interface';

@Injectable()
export class ValidateResetPasswordTokenAuthService implements IValidateResetPasswordTokenAuthService {
  constructor(
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepo: Repository<PasswordResetEntity>,
  ) { }

  async execute(token: string, entityManager?: EntityManager): Promise<PasswordResetEntity> {
    const reset = entityManager
      ? await entityManager.findOne(PasswordResetEntity, {
        where: { resetHash: token },
        lock: { mode: 'pessimistic_write' },
      })
      : await this.passwordResetRepo.findOne({
        where: { resetHash: token },
      });

    if (!reset) {
      throw new ResetPasswordTokenInvalidException();
    }

    if (reset.usedAt) {
      throw new ResetPasswordTokenUsedException();
    }

    const now = new Date();
    if (reset.expiresAt.getTime() < now.getTime()) {
      throw new ResetPasswordTokenExpiredException();
    }

    return reset;
  }
}
