import { Get, Inject, UseGuards } from '@nestjs/common';
import { LoggedUser } from 'src/modules/auth/decorators';

import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from '../domain/role.enum';
import { LoggedUserDto } from '../dto/logged.user.dto';
import { TYPES } from '../interfaces';
import { IMarkUserLoginService } from '../interfaces/services/mark.user.login.service.interface';
import { SubscriptionGuard } from 'src/modules/subscription/guards/subscription.guard';
import { SubscriptionDecorator } from 'src/modules/subscription/decorators/subscription.decorator';
import { CachedSubscription } from 'src/modules/subscription/dto/cached-response.dto';
import { PUBLIC_LIBRARY_ENABLED } from 'src/utils/environment/public-library.environment';

@AuthController('user')
export class MeUserController {
  constructor(
    @Inject(TYPES.services.IMarkUserLoginService)
    private readonly markUserLoginService: IMarkUserLoginService
  ) {}

  @Get()
  @Roles(Role.SpaceAdmin)
  @UseGuards(SubscriptionGuard)
  async me(
    @LoggedUser() user: LoggedUserDto,
    @SubscriptionDecorator() subscription: Partial<CachedSubscription>
  ) {
    await this.markUserLoginService.execute(user.id);
    return {
      user,
      subscription: { ...subscription, publicLibraryEnabled: PUBLIC_LIBRARY_ENABLED }
    }
  }
}

