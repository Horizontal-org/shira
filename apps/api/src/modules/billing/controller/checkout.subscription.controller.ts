import { Body, Post } from "@nestjs/common";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { CreateCheckoutDto } from "../dto/create-checkout.dto";
import { SubscriptionCacheService } from "../services/subscription-cache.service";
import { ShiraPaymentsService } from "../services/shira-payments.service";
import { Role } from "src/modules/user/domain/role.enum";
import { Roles } from "src/modules/auth/decorators/roles.decorators";

@AuthController('subscription/checkout')
export class CheckoutSubscriptionController {
  constructor(
    private readonly shiraPaymentsService: ShiraPaymentsService,
    private readonly subscriptionCacheService: SubscriptionCacheService,
  ) { }

  @Post()
  @Roles(Role.SpaceAdmin)
  async handler(@Body() dto: CreateCheckoutDto) {
    const response = await this.shiraPaymentsService.createCheckout(dto);

    await this.subscriptionCacheService.invalidate(dto.organizationId);

    return response;
  }
}
