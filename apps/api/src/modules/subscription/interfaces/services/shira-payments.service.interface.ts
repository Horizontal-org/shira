
import { CheckoutSubscriptionType } from "../../dto/checkout-subscription.dto";

export interface IShiraPaymentsService {
  createCheckout(
    organizationId: string,
    selectedSubscriptionType: CheckoutSubscriptionType,
  ): Promise<{ url: string }>;
  manageSubscription(organizationId: string): Promise<{ url: string }>;
  getSubscription(organizationId: string): Promise<{ subscription: Record<string, unknown> }>;
  recordUsage(organizationId: string): Promise<void>;
}
