import { ShiraPaymentsLoggerService } from './services/shira-payments-logger.service'
import { ShiraPaymentsService } from './services/shira-payments.service'
import { SubscriptionCacheService } from './services/subscription-cache.service'

export const subscriptionServiceProviders = [
  ShiraPaymentsLoggerService,
  ShiraPaymentsService,
  SubscriptionCacheService,
]
