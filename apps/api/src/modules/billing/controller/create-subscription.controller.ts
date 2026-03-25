import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { ICreateSubscriptionService, TYPES } from "../interfaces";
import { Body, Inject, Logger, Post } from "@nestjs/common";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { Role } from "src/modules/user/domain/role.enum";
import { CreateSubscriptionDTO } from "../dto/create-subscription.dto";

/**
 * Legacy admin-only endpoint.
 * Stripe-backed subscription flows should go through the payments facade endpoints instead.
 */
@AuthController('billing/subscription')
export class CreateSubscriptionController {
    private readonly logger = new Logger(CreateSubscriptionController.name);

    constructor(
        @Inject(TYPES.services.ICreateSubscriptionService)
        private readonly createSubscriptionService: ICreateSubscriptionService
    ){}

    @Post()
    @Roles(Role.SuperAdmin)
    async create(@Body() createSubscriptionDto: CreateSubscriptionDTO) {
        this.logger.warn('Legacy subscription creation endpoint used. Prefer /subscription/checkout and /subscription/manage.');

        const subscription = await this.createSubscriptionService.execute(createSubscriptionDto)

        return {
            message: 'Legacy subscription created',
            subscription
        }
    }
}
