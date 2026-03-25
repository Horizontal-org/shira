import { Get, Param, ParseIntPipe } from "@nestjs/common";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { SubscriptionCacheService } from "../services/subscription-cache.service";

@AuthController('subscription')
export class GetSubscriptionController {
  constructor(
    private readonly subscriptionCacheService: SubscriptionCacheService,
  ) { }

  @Get(':organizationId')
  async handler(@Param('organizationId', ParseIntPipe) organizationId: number) {
    const subscription = await this.subscriptionCacheService.getCurrentSubscription(organizationId);

    return { subscription };
  }
}
