import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { Repository } from "typeorm";
import { UserEntity } from "src/modules/user/domain/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EmailUpdateTokenInvalidException, InvalidEmailUpdateException, UserNotFoundException } from "../exceptions";
import { IConfirmUpdateAuthService } from "../interfaces/services/update-space.auth.service.interface";

@Injectable()
export class ConfirmEmailUpdateAuthService implements IConfirmUpdateAuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) { }

  private readonly logger = new ApiLogger(ConfirmEmailUpdateAuthService.name);

  async execute(token: string): Promise<void> {
    let payload: {
      type?: string;
      userId?: string;
      currentEmail?: string;
      newEmail?: string;
    };

    try {
      payload = await this.jwtService.verify(token);
    } catch {
      throw new EmailUpdateTokenInvalidException();
    }

    const currentEmail = payload.currentEmail?.trim().toLowerCase();
    const newEmail = payload.newEmail?.trim().toLowerCase();

    if (
      payload.type !== "email_update" ||
      !payload.userId ||
      !currentEmail ||
      !newEmail
    ) {
      throw new EmailUpdateTokenInvalidException();
    }

    const user = await this.userRepository.findOne({
      where: { id: Number(payload.userId), email: currentEmail },
    });

    if (!user) {
      throw new UserNotFoundException(currentEmail);
    }

    if (user.email === newEmail) {
      throw new InvalidEmailUpdateException(currentEmail, newEmail);
    }

    const updatedUser = this.userRepository.create({
      ...user,
      email: newEmail
    });

    await this.userRepository.save(updatedUser);

    this.logger.log(`Email update confirmed for user ${user.id}, new email: ${newEmail}`);
  }
}
