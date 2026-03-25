import { Get, Inject, Param } from "@nestjs/common";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { SubscriptionCacheService } from "../services/subscription-cache.service";
import { TYPES } from "../interfaces";

@AuthController('subscription')
export class GetSubscriptionController {
  constructor(
    @Inject(TYPES.services.ISubscriptionCacheService)
    private readonly subscriptionCacheService: SubscriptionCacheService,
  ) { }

  @Get(':organizationId')
  async handler(
    @Param('organizationId') organizationId: string
  ) {
    const subscription = await this.subscriptionCacheService.getCurrentSubscription(organizationId);

    return { subscription };
  }
}
