import { CheckoutSubscriptionController } from "./checkout.subscription.controller";
import { CreateSubscriptionController } from "./create-subscription.controller";
import { GetSubscriptionController } from "./get-subscription.controller";
import { ListPlanController } from "./list.plan.controller";
import { ManageSubscriptionController } from "./manage.subscription.controller";

export const billingControllers = [
  CheckoutSubscriptionController,
  CreateSubscriptionController,
  GetSubscriptionController,
  ListPlanController,
  ManageSubscriptionController,
]
