import { ShiraPaymentsService } from './services/shira-payments.service'
import { SubscriptionCacheService } from './services/subscription-cache.service'

export const subscriptionServiceProviders = [
  ShiraPaymentsService,
  SubscriptionCacheService,
]
