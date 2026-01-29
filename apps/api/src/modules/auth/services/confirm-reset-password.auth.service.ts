import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IConfirmPasswordResetAuthService } from '../interfaces';
import { ConfirmResetPasswordAuthDto } from '../domain/confirm-reset-password.auth.dto';
import { PasswordResetEntity } from '../domain/password-reset.entity';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { hashPassword } from 'src/utils/password.utils';

@Injectable()
export class ConfirmResetPasswordAuthService implements IConfirmPasswordResetAuthService {
  constructor(
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepo: Repository<PasswordResetEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) { }

  async execute(confirmResetPasswordData: ConfirmResetPasswordAuthDto): Promise<void> {
    const reset = await this.passwordResetRepo.findOne({
      where: { resetHash: confirmResetPasswordData.token },
    });

    if (!reset || reset.usedAt) {
      throw new NotFoundException();
    }

    if (reset.expiresAt.getTime() < new Date().getTime()) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepo.findOne({
      where: { email: reset.email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    user.password = await hashPassword(confirmResetPasswordData.password);
    await this.userRepo.save(user);

    reset.usedAt = new Date();
    await this.passwordResetRepo.save(reset);
  }
}
