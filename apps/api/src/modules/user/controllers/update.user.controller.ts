import { Body, Inject, Put } from '@nestjs/common';
import { Role } from 'src/modules/user/domain/role.enum';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { LoggedUserDto } from '../dto/logged.user.dto';
import { LoggedUser, SpaceId } from 'src/modules/auth/decorators';
import { UpdateEmailAuthDto } from 'src/modules/auth/domain/update-email.auth.dto';
import { UpdatePasswordAuthDto } from 'src/modules/auth/domain/update-password.auth.dto';
import { TYPES as UserTYPES } from 'src/modules/user/interfaces/types';
import { IConfirmUpdateUserService } from 'src/modules/user/interfaces/services/confirm-update.user.service.interface';
import { IRequestEmailUpdateUserService } from 'src/modules/user/interfaces/services/request-email-update.user.service.interface';

@AuthController('user/update')
export class UpdateUserController {
  constructor(
    @Inject(UserTYPES.services.IRequestEmailUpdateUserService)
    private readonly requestEmailUpdateUserService: IRequestEmailUpdateUserService,
    @Inject(UserTYPES.services.IConfirmPasswordUpdateUserService)
    private readonly confirmPasswordUpdateAuthService: IConfirmUpdateUserService,
  ) { }

  @Put('email')
  @Roles(Role.SpaceAdmin)
  async requestEmailUpdate(
    @Body() dto: UpdateEmailAuthDto,
    @SpaceId() spaceId: number
  ) {
    await this.requestEmailUpdateUserService.execute(dto, spaceId);
  }

  @Put('password')
  @Roles(Role.SpaceAdmin)
  async updatePassword(
    @Body() dto: UpdatePasswordAuthDto,
    @SpaceId() spaceId: number,
    @LoggedUser() user: LoggedUserDto
  ) {
    await this.confirmPasswordUpdateAuthService.execute(dto, Number(user.id), spaceId);
  }
}
