import { CheckoutSubscriptionController } from "./checkout.subscription.controller";
import { GetSubscriptionController } from "./get-subscription.controller";
import { ManageSubscriptionController } from "./manage.subscription.controller";

export const subscriptionControllers = [
  GetSubscriptionController,
  CheckoutSubscriptionController,
  ManageSubscriptionController,
]
