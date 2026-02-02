import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { addMinutes } from 'date-fns';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { ResetPasswordAuthDto } from '../domain/reset-password.auth.dto';
import { PasswordResetEntity } from '../domain/password-reset.entity';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { ApiLogger } from 'src/utils/logger/api-logger.service';
import { IRequestPasswordResetAuthService } from '../interfaces/services/request-password-reset.auth.service.interface';
import { hashResetToken } from 'src/utils/token.utils';

const RESET_PASSWORD_LINK_EXPIRES_MINUTES = 10;

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

  private readonly logger = new ApiLogger(RequestPasswordResetAuthService.name);

  async execute(resetPasswordData: ResetPasswordAuthDto): Promise<void> {
    const email = resetPasswordData.email.trim().toLowerCase();
    this.logger.log(`Processing password reset request for email: ${email}`);

    const user = await this.userRepo.findOne({
      where: { email },
    });

    if (!user) { return; }

    await this.passwordResetRepo.update(
      { userId: user.id, usedAt: null },
      { usedAt: new Date() },
    );

    const reset = new PasswordResetEntity();
    reset.userId = user.id;
    reset.email = email;

    const rawToken = crypto.randomBytes(20).toString('hex');
    reset.resetHash = hashResetToken(rawToken);
    reset.expiresAt = addMinutes(new Date(), RESET_PASSWORD_LINK_EXPIRES_MINUTES);

    await this.passwordResetRepo.save(reset);

    const resetLink = `${process.env.SPACE_URL}/reset-password/confirm/${rawToken}`;

    await this.emailsQueue.add('send', {
      to: user.email,
      from: process.env.SMTP_GLOBAL_FROM,
      subject: 'Reset your Shira password',
      template: 'reset-password',
      data: {
        email: user.email,
        resetLink,
        resetLinkExpiresInMinutes: RESET_PASSWORD_LINK_EXPIRES_MINUTES,
      },
    });
  }
}
