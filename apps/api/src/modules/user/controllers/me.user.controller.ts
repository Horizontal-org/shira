import { Get, Inject } from '@nestjs/common';
import { LoggedUser } from 'src/modules/auth/decorators';

import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from '../domain/role.enum';
import { LoggedUserDto } from '../dto/logged.user.dto';
import { TYPES } from '../interfaces';
import { IMarkUserLoginService } from '../interfaces/services/mark.user.login.service.interface';

@AuthController('user')
export class MeUserController {
  constructor(
    @Inject(TYPES.services.IMarkUserLoginService)
    private readonly markUserLoginService: IMarkUserLoginService
  ) {}

  @Get()
  @Roles(Role.SpaceAdmin)
  async me(@LoggedUser() user: LoggedUserDto) {
    await this.markUserLoginService.execute(user.id);
    return user
  }
}

