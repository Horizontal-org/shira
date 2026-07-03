import { Inject, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { Role } from "src/modules/user/domain/role.enum";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { TYPES } from "../interfaces";
import { ISubscriptionCacheService } from "../interfaces/services/subscription-cache.service.interface";
import { IShiraPaymentsService } from "../interfaces/services/shira-payments.service.interface";
import { SelfHostedDisabledGuard } from "../guards/self-hosted-disabled.guard";

@AuthController('subscription/manage')
@UseGuards(SelfHostedDisabledGuard)
export class ManageSubscriptionController {
  constructor(
    @Inject(TYPES.services.IShiraPaymentsService)
    private readonly shiraPaymentsService: IShiraPaymentsService,
    @Inject(TYPES.services.ISubscriptionCacheService)
    private readonly subscriptionCacheService: ISubscriptionCacheService,
  ) { }

  @Post(':organizationId')
  @Roles(Role.SpaceAdmin)
  async handler(@Param('organizationId') organizationId: string) {
    const response = await this.shiraPaymentsService.manageSubscription(organizationId);

    await this.subscriptionCacheService.invalidate(organizationId);

    return response;
  }
}
