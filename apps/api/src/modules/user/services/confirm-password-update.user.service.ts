import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { Repository } from "typeorm";
import { UserEntity } from "src/modules/user/domain/user.entity";
import { comparePassword, hashPassword } from "src/utils/password.utils";
import { UpdatePasswordAuthDto } from "src/modules/auth/domain/update-password.auth.dto";
import { IConfirmUpdateUserService } from "../interfaces/services/confirm-update.user.service.interface";
import { CurrentPasswordIncorrectException, UserNotFoundException } from "../exceptions";

@Injectable()
export class ConfirmPasswordUpdateUserService implements IConfirmUpdateUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  private readonly logger = new ApiLogger(ConfirmPasswordUpdateUserService.name);

  async execute(dto: UpdatePasswordAuthDto, userId: number, spaceId: number): Promise<void> {
    this.logger.log(`Processing password update for user ${userId}`);

    const user = await this.findUserByIdAndSpace(String(userId), spaceId);

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

    const updatedUser = this.userRepository.create({
      ...user,
      password: await hashPassword(dto.newPassword),
      lastPasswordChangeAt: new Date(),
    });

    await this.userRepository.save(updatedUser);

    this.logger.log(`Password updated for user ${user.id}`);
  }

  private async findUserByIdAndSpace(userId: string, spaceId: number): Promise<UserEntity | null> {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.spaces', 'space', 'space.id = :spaceId', { spaceId })
      .where('user.id = :userId', { userId })
      .getOne();
  }
}
