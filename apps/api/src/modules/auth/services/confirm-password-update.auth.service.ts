import { Injectable } from "@nestjs/common";
import { IConfirmUpdateAuthService } from "../interfaces/services/update-space.auth.service.interface";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { UpdatePasswordAuthDto } from "../domain/update-password.auth.dto";

@Injectable()
export class ConfirmPasswordUpdateAuthService implements IConfirmUpdateAuthService {

  private readonly logger = new ApiLogger(ConfirmPasswordUpdateAuthService.name);

  async execute(dto: UpdatePasswordAuthDto): Promise<void> {
    this.logger.log(`Processing password update confirmation for ${dto.newPassword}`);
  }
}