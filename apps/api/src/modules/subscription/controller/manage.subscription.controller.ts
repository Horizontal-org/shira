import { Body, Inject, Post } from "@nestjs/common";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { ManageSubscriptionDto } from "../dto/manage-subscription.dto";
import { TYPES } from "../interfaces";
import { ISubscriptionCacheService } from "../interfaces/services/subscription-cache.service.interface";
import { IShiraPaymentsService } from "../interfaces/services/shira-payments.service.interface";

@AuthController('subscription/manage')
export class ManageSubscriptionController {
  constructor(
    @Inject(TYPES.services.IShiraPaymentsService)
    private readonly shiraPaymentsService: IShiraPaymentsService,
    @Inject(TYPES.services.ISubscriptionCacheService)
    private readonly subscriptionCacheService: ISubscriptionCacheService,
  ) { }

  @Post('manage/:organizationId')
  async handler(@Body() dto: ManageSubscriptionDto) {
    const response = await this.shiraPaymentsService.manageSubscription(dto.organizationId);

    await this.subscriptionCacheService.invalidate(dto.organizationId);

    return response;
  }
}
