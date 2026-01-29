import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addDays } from 'date-fns';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { IRequestPasswordResetAuthService } from '../interfaces';
import { ResetPasswordAuthDto } from '../domain/reset-password.auth.dto';
import { PasswordResetEntity } from '../domain/password-reset.entity';
import { UserEntity } from 'src/modules/user/domain/user.entity';

@Injectable()
export class RequestPasswordResetAuthService implements IRequestPasswordResetAuthService {
  constructor(
    @InjectRepository(PasswordResetEntity)
    private readonly passwordResetRepo: Repository<PasswordResetEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectQueue('emails')
    private readonly emailsQueue: Queue,
  ) { }

  async execute(resetPasswordData: ResetPasswordAuthDto): Promise<void> {
    const email = resetPasswordData.email.trim().toLowerCase();
    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (!user) {
      return;
    }

    await this.passwordResetRepo.update(
      { email, usedAt: null },
      { usedAt: new Date() },
    );

    const reset = new PasswordResetEntity();
    reset.email = email;
    reset.resetHash = crypto.randomBytes(20).toString('hex');
    reset.expiresAt = addDays(new Date(), 1);

    await this.passwordResetRepo.save(reset);

    const resetLink = `${process.env.SPACE_URL}/reset-password?token=${reset.resetHash}`;

    await this.emailsQueue.add('send', {
      to: reset.email,
      from: process.env.SMTP_GLOBAL_FROM,
      subject: 'Reset your Shira password',
      template: 'reset-password',
      data: {
        email: reset.email,
        resetLink,
      },
    });
  }
}
