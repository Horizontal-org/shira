import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { Repository } from "typeorm";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { UserEntity } from "src/modules/user/domain/user.entity";
import { UpdateEmailAuthDto } from "src/modules/auth/domain/update-email.auth.dto";
import { EmailTakenException, InvalidEmailUpdateException, UserNotFoundException } from "src/modules/auth/exceptions";
import { IRequestEmailUpdateUserService } from "../interfaces/services/request-email-update.user.service.interface";

const EMAIL_UPDATE_LINK_EXPIRES = "10m";

@Injectable()
export class RequestEmailUpdateUserService implements IRequestEmailUpdateUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectQueue('emails')
    private readonly emailsQueue: Queue,
    private readonly jwtService: JwtService,
  ) { }

  private readonly logger = new ApiLogger(RequestEmailUpdateUserService.name);

  async execute(dto: UpdateEmailAuthDto, spaceId: number): Promise<void> {
    this.logger.log(`Processing email update request for ${dto.newEmail} in space ${spaceId}`);

    const currentEmail = dto.currentEmail.trim().toLowerCase();
    const newEmail = dto.newEmail.trim().toLowerCase();

    const user = await this.findUserByEmailAndSpace(currentEmail, spaceId);

    if (!user) {
      throw new UserNotFoundException(currentEmail);
    }

    if (currentEmail === newEmail) {
      throw new InvalidEmailUpdateException(currentEmail, newEmail);
    }

    const existingUser = await this.findUserByEmailAndSpace(newEmail, spaceId);

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
        newEmail,
        confirmLink,
      },
    });
  }

  private async findUserByEmailAndSpace(email: string, spaceId: number): Promise<UserEntity | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.spaces', 'space', 'space.id = :spaceId', { spaceId })
      .where('user.email = :email', { email })
      .getOne();
  }
}
