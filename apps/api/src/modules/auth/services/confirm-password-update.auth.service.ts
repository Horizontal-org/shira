import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { Repository } from "typeorm";
import { UserEntity } from "src/modules/user/domain/user.entity";
import { comparePassword, hashPassword } from "src/utils/password.utils";
import { UpdatePasswordAuthDto } from "../domain/update-password.auth.dto";
import { IConfirmUpdateAuthService } from "../interfaces/services/confirm-update-space.auth.service.interface";
import { CurrentPasswordIncorrectException, UserNotFoundException } from "../exceptions";

@Injectable()
export class ConfirmPasswordUpdateAuthService implements IConfirmUpdateAuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  private readonly logger = new ApiLogger(ConfirmPasswordUpdateAuthService.name);

  async execute(dto: UpdatePasswordAuthDto, userId: number): Promise<void> {
    this.logger.log(`Processing password update for user ${userId}`);

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new UserNotFoundException(String(userId));
    }

    const currentPasswordIsValid = await comparePassword(
      dto.currentPassword,
      user.password,
    );

    if (!currentPasswordIsValid) {
      throw new CurrentPasswordIncorrectException();
    }

    user.password = await hashPassword(dto.newPassword);
    user.lastPasswordChangeAt = new Date();

    await this.userRepository.save(user);

    this.logger.log(`Password updated for user ${user.id}`);
  }
}
