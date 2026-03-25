export type CachedSubscription = {
  organizationId: string
  status: string
  stripeCustomerId: string | null
  createdAt: string | null
  source: 'payments-api'
}
