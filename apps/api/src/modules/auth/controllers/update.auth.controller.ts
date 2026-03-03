import { Body, Controller, Inject, Put } from '@nestjs/common';
import { TYPES } from '../interfaces';
import { UpdateEmailAuthDto } from '../domain/update-email.auth.dto';
import { UpdatePasswordAuthDto } from '../domain/update-password.auth.dto';
import { IConfirmUpdateAuthService } from '../interfaces/services/update-space.auth.service.interface';
import { Role } from 'src/modules/user/domain/role.enum';
import { Roles } from '../decorators/roles.decorators';

@Controller('space/update')
export class UpdateAuthController {
  constructor(
    @Inject(TYPES.services.IConfirmUpdateAuthService)
    private confirmEmailUpdateAuthService: IConfirmUpdateAuthService,
    private confirmPasswordUpdateAuthService: IConfirmUpdateAuthService,
  ) { }

  @Put('email')
  @Roles(Role.SuperAdmin)
  async updateEmail(@Body() dto: UpdateEmailAuthDto) {
    await this.confirmEmailUpdateAuthService.execute(dto);
  }

  @Put('password')
  @Roles(Role.SuperAdmin)
  async updatePassword(@Body() dto: UpdatePasswordAuthDto) {
    await this.confirmPasswordUpdateAuthService.execute(dto);
  }
}
