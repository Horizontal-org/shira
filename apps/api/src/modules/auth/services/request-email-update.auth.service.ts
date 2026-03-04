import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { Repository } from "typeorm";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { UserEntity } from "src/modules/user/domain/user.entity";
import { UpdateEmailAuthDto } from "../domain/update-email.auth.dto";
import { EmailTakenException, InvalidEmailUpdateException, UserNotFoundException } from "../exceptions";
import { IRequestEmailUpdateAuthService } from "../interfaces/services/request-email-update.auth.service.interface";

const EMAIL_UPDATE_LINK_EXPIRES = '1d';

@Injectable()
export class RequestEmailUpdateAuthService implements IRequestEmailUpdateAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectQueue('emails')
    private readonly emailsQueue: Queue,
    private readonly jwtService: JwtService,
  ) { }

  private readonly logger = new ApiLogger(RequestEmailUpdateAuthService.name);

  async execute(dto: UpdateEmailAuthDto): Promise<void> {
    this.logger.log(`Processing email update request for ${dto.newEmail}`);

    const currentEmail = dto.currentEmail.trim().toLowerCase();
    const newEmail = dto.newEmail.trim().toLowerCase();

    const user = await this.userRepository.findOne({
      where: { email: currentEmail },
    });

    if (!user) {
      throw new UserNotFoundException(currentEmail);
    }

    if (currentEmail === newEmail) {
      throw new InvalidEmailUpdateException(currentEmail, newEmail);
    }

    const existingUser = await this.userRepository.findOne({
      where: { email: newEmail },
    });

    if (existingUser) {
      throw new EmailTakenException();
    }

    const token = this.jwtService.sign({
      type: 'email_update',
      userId: String(user.id),
      currentEmail,
      newEmail,
    }, {
      expiresIn: EMAIL_UPDATE_LINK_EXPIRES,
    });

    const confirmLink = `${process.env.SPACE_URL}/confirm-email-update/${token}`;

    await this.emailsQueue.add('send', {
      to: newEmail,
      from: process.env.SMTP_GLOBAL_FROM,
      subject: 'Confirm your Shira email change',
      template: 'confirm-email-update',
      data: {
        currentEmail,
        newEmail,
        confirmLink,
      },
    });
  }
}
