import { AuthController } from "src/utils/decorators/auth-controller.decorator";
import { ICreateSubscriptionService, TYPES } from "../interfaces";
import { Body, Inject, Post } from "@nestjs/common";
import { Roles } from "src/modules/auth/decorators/roles.decorators";
import { Role } from "src/modules/user/domain/role.enum";
import { CreateSubscriptionDTO } from "../dto/create-subscription.dto";

@AuthController('billing/subscription')
export class CreateSubscriptionController {
    constructor(
        @Inject(TYPES.services.ICreateSubscriptionService)
        private readonly createSubscriptionService: ICreateSubscriptionService
    ){}

    @Post()
    @Roles(Role.SuperAdmin)
    async create(@Body() createSubscriptionDto: CreateSubscriptionDTO) {
        const subscription = await this.createSubscriptionService.execute(createSubscriptionDto)

        return {
            message: 'Subscription created',
            subscription
        }
    }
}