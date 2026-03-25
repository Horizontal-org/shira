import { Get, Inject, Param } from "@nestjs/common";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { TYPES } from "../interfaces";
import { ISubscriptionCacheService } from "../interfaces/services/subscription-cache.service.interface";

@AuthController('subscription')
export class GetSubscriptionController {
  constructor(
    @Inject(TYPES.services.ISubscriptionCacheService)
    private readonly subscriptionCacheService: ISubscriptionCacheService,
  ) { }

  @Get(':organizationId')
  async handler(
    @Param('organizationId') organizationId: string
  ) {
    const subscription = await this.subscriptionCacheService.getCurrentSubscription(organizationId);

    return { subscription };
  }
}
