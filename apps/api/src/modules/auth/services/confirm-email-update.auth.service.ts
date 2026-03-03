import { Injectable } from "@nestjs/common";
import { IConfirmUpdateAuthService } from "../interfaces/services/update-space.auth.service.interface";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { UpdateEmailAuthDto } from "../domain/update-email.auth.dto";

@Injectable()
export class ConfirmEmailUpdateAuthService implements IConfirmUpdateAuthService {

  private readonly logger = new ApiLogger(ConfirmEmailUpdateAuthService.name);

  async execute(dto: UpdateEmailAuthDto): Promise<void> {
    this.logger.log(`Processing email update confirmation for ${dto.newEmail}`);
  }
}