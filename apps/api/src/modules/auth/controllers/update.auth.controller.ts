import { Body, Inject, Put } from '@nestjs/common';
import { UpdateEmailAuthDto } from '../domain/update-email.auth.dto';
import { UpdatePasswordAuthDto } from '../domain/update-password.auth.dto';
import { Role } from 'src/modules/user/domain/role.enum';
import { Roles } from '../decorators/roles.decorators';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { TYPES } from '../interfaces/types';
import { IRequestEmailUpdateAuthService } from '../interfaces/services/request-email-update.auth.service.interface';
import { IConfirmUpdateAuthService } from '../interfaces/services/confirm-update-space.auth.service.interface';
import { SpaceId } from '../decorators';

@AuthController('space/update')
export class UpdateAuthController {
  constructor(
    @Inject(TYPES.services.IRequestEmailUpdateAuthService)
    private requestEmailUpdateAuthService: IRequestEmailUpdateAuthService,
    @Inject(TYPES.services.IConfirmPasswordUpdateAuthService)
    private confirmPasswordUpdateAuthService: IConfirmUpdateAuthService,
  ) { }

  @Put('email')
  @Roles(Role.SpaceAdmin)
  async updateEmail(
    @Body() dto: UpdateEmailAuthDto,
    @SpaceId() spaceId: number
  ) {
    await this.requestEmailUpdateAuthService.execute(dto, spaceId);
  }

  @Put('password')
  @Roles(Role.SpaceAdmin)
  async updatePassword(@Body() dto: UpdatePasswordAuthDto) {
    await this.confirmPasswordUpdateAuthService.execute(dto);
  }
}
