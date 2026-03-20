import { AuthController } from "src/utils/decorators/auth-controller.decorator";

@AuthController('subscription/usage')
export class UsageSubscriptionController {
    constructor() { }
}