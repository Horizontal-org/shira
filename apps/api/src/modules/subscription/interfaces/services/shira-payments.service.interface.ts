export interface IShiraPaymentsService {
  createCheckout(organizationId: string,): Promise<{ url: string }>;
  manageSubscription(organizationId: string): Promise<{ url: string }>;
  getSubscription(organizationId: string): Promise<{ subscription: Record<string, unknown> }>;
  recordUsage(organizationId: string): Promise<void>;
}
