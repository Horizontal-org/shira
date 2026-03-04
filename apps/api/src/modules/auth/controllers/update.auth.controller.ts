import { Body, Inject, Param, Post, Put, Req } from '@nestjs/common';
import { UpdateEmailAuthDto } from '../domain/update-email.auth.dto';
import { UpdatePasswordAuthDto } from '../domain/update-password.auth.dto';
import { Role } from 'src/modules/user/domain/role.enum';
import { Roles } from '../decorators/roles.decorators';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';
import { TYPES } from '../interfaces/types';
import { IRequestEmailUpdateAuthService } from '../interfaces/services/request-email-update.auth.service.interface';
import { IConfirmUpdateAuthService } from '../interfaces/services/update-space.auth.service.interface';

@AuthController('space/update')
export class UpdateAuthController {
  constructor(
    @Inject(TYPES.services.IRequestEmailUpdateAuthService)
    private requestEmailUpdateAuthService: IRequestEmailUpdateAuthService,
    @Inject(TYPES.services.IConfirmUpdateAuthService)
    private confirmPasswordUpdateAuthService: IConfirmUpdateAuthService,
    @Inject(TYPES.services.IConfirmUpdateAuthService)
    private confirmEmailUpdateAuthService: IConfirmUpdateAuthService,
  ) { }

  @Put('email')
  @Roles(Role.SuperAdmin)
  async updateEmail(@Body() dto: UpdateEmailAuthDto, @Req() req) {
    const user = req.user as LoggedUserDto;
    await this.requestEmailUpdateAuthService.execute({
      ...dto,
      currentEmail: user.email,
    });
  }

  @Post('email/confirm/:token')
  async confirm(@Param('token') token: string) {
    await this.confirmEmailUpdateAuthService.execute(token);
  }

  @Put('password')
  @Roles(Role.SuperAdmin)
  async updatePassword(@Body() dto: UpdatePasswordAuthDto) {
    await this.confirmPasswordUpdateAuthService.execute(dto);
  }
}
