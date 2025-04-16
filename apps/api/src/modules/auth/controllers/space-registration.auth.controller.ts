import { Inject, Post, Body, Controller } from "@nestjs/common";
import { ISpaceRegistrationAuthService, TYPES } from "../interfaces";
import { RegisterAuthDto } from "../domain/register.auth.dto";

@Controller('space-registration')
export class SpaceRegistrationAuthController {
  constructor(
    @Inject(TYPES.services.ISpaceRegistrationAuthService)
    private spaceRegistrationService: ISpaceRegistrationAuthService,
  ) {}

  @Post()
  async register(@Body() registerDto: RegisterAuthDto) {
    try {
      await this.spaceRegistrationService.execute(registerDto)
      return { success: true, message: 'space and user registered successfully'}
    } catch (error) {
      throw error
    }
  }
}