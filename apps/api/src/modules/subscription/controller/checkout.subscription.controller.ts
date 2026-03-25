import { Body, Inject, Post } from "@nestjs/common";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { CreateCheckoutDto } from "../dto/create-checkout.dto";
import { Role } from "src/modules/user/domain/role.enum";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { TYPES } from "../interfaces";
import { IShiraPaymentsService } from "../interfaces/services/shira-payments.service.interface";
import { ISubscriptionCacheService } from "../interfaces/services/subscription-cache.service.interface";

@AuthController('subscription/checkout')
export class CheckoutSubscriptionController {
  constructor(
    @Inject(TYPES.services.IShiraPaymentsService)
    private readonly shiraPaymentsService: IShiraPaymentsService,
    @Inject(TYPES.services.ISubscriptionCacheService)
    private readonly subscriptionCacheService: ISubscriptionCacheService,
  ) { }

  @Post()
  @Roles(Role.SpaceAdmin)
  async handler(@Body() dto: CreateCheckoutDto) {
    const response = await this.shiraPaymentsService.createCheckout(dto.organizationId);

    await this.subscriptionCacheService.invalidate(dto.organizationId);

    return response;
  }
}
