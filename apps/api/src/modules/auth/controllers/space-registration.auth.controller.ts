import { Inject, Post, Body, Controller, BadRequestException, UnprocessableEntityException } from "@nestjs/common";
import { ISpaceRegistrationAuthService, TYPES } from "../interfaces";
import { RegisterAuthDto } from "../domain/register.auth.dto";
import { ApiLogger } from "src/utils/logger/api-logger.service";
import { GenericAuthErrorException } from "../exceptions/generic-error.auth.exception";

@Controller('space-registration')
export class SpaceRegistrationAuthController {
  constructor(
    @Inject(TYPES.services.ISpaceRegistrationAuthService)
    private spaceRegistrationService: ISpaceRegistrationAuthService,
  ) {}

  private logger = new ApiLogger(SpaceRegistrationAuthController.name);

  @Post()
  async register(@Body() registerDto: RegisterAuthDto) {
    try {
      await this.spaceRegistrationService.execute(registerDto)
    } catch (error) {
      this.logger.error('Error during space registration', error);
      throw error;
    }
  }
}