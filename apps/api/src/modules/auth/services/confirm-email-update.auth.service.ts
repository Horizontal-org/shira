import { Injectable } from "@nestjs/common";
import { IConfirmUpdateAuthService } from "../interfaces/services/update-space.auth.service.interface";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { UpdateEmailAuthDto } from "../domain/update-email.auth.dto";
import { Repository } from "typeorm";
import { UserEntity } from "src/modules/user/domain/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { InvalidEmailUpdateException, UserNotFoundException } from "../exceptions";

@Injectable()
export class ConfirmEmailUpdateAuthService implements IConfirmUpdateAuthService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  private readonly logger = new ApiLogger(ConfirmEmailUpdateAuthService.name);

  async execute(dto: UpdateEmailAuthDto): Promise<void> {
    this.logger.log(`Processing email update confirmation for ${dto.newEmail}`);

    const user = await this.userRepository.findOne({
      where: { email: dto.currentEmail },
    });

    if (!user) {
      throw new UserNotFoundException(dto.currentEmail);
    }

    if (user.email === dto.newEmail) {
      throw new InvalidEmailUpdateException(dto.currentEmail, dto.newEmail);
    }

    const updatedUser = this.userRepository.create({
      ...user,
      email: dto.newEmail,
    });

    await this.userRepository.save(updatedUser);

    this.logger.log(`Email update confirmed for user ${user.id}, new email: ${dto.newEmail}`);
  }
}
