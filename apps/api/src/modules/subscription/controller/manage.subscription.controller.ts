import { Body, Post } from "@nestjs/common";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { ManageSubscriptionDto } from "../dto/manage-subscription.dto";
import { SubscriptionCacheService } from "../services/subscription-cache.service";
import { ShiraPaymentsService } from "../services/shira-payments.service";

@AuthController('subscription/manage')
export class ManageSubscriptionController {
  constructor(
    private readonly shiraPaymentsService: ShiraPaymentsService,
    private readonly subscriptionCacheService: SubscriptionCacheService,
  ) { }

  @Post()
  async handler(@Body() dto: ManageSubscriptionDto) {
    const response = await this.shiraPaymentsService.manageSubscription(dto.organizationId);

    await this.subscriptionCacheService.invalidate(dto.organizationId);

    return response;
  }
}
