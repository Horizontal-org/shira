import { Get, Inject } from "@nestjs/common";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { TYPES } from "../interfaces";
import { ISubscriptionCacheService } from "../interfaces/services/subscription-cache.service.interface";
import { LoggedUser } from "src/modules/auth/decorators";
import { LoggedUserDto } from "src/modules/user/dto/logged.user.dto";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { Role } from "src/modules/user/domain/role.enum";
import { PUBLIC_LIBRARY_ENABLED } from "src/utils/environment/public-library.environment";

@AuthController('subscription')
export class GetSubscriptionController {
  constructor(
    @Inject(TYPES.services.ISubscriptionCacheService)
    private readonly subscriptionCacheService: ISubscriptionCacheService,
  ) { }

  @Get()
  @Roles(Role.SpaceAdmin)
  async handler(
    @LoggedUser() user: LoggedUserDto,
  ) {
    const subscription = await this.subscriptionCacheService.getCurrentSubscription(String(user.activeOrganization.id), user.activeSpace.space.id);

    return { ...subscription, publicLibraryEnabled: PUBLIC_LIBRARY_ENABLED };
  }
}
