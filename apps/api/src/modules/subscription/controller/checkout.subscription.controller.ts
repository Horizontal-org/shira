import { Inject, Param, ParseEnumPipe, Post, Query } from "@nestjs/common";
import { AuthController } from "src/utils/decorators/auth-controller.decorator";
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

  @Post(':organizationId')
  @Roles(Role.SpaceAdmin)
  async handler(
    @Param('organizationId') organizationId: string,
    @Query('subLength', new ParseEnumPipe(
      {
        ANNUAL: "annual",
        MONTHLY: "monthly",
      },
      { optional: true },
    )) subLength: "annual" | "monthly" = "monthly",
  ) {
    const response = await this.shiraPaymentsService.createCheckout(organizationId, subLength);

    await this.subscriptionCacheService.invalidate(organizationId);

    return response;
  }
}
