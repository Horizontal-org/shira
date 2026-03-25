import { TYPES } from './interfaces'
import { CreateSubscriptionService } from './services/create-subscription.service'
import { ShiraPaymentsService } from './services/shira-payments.service'
import { SubscriptionCacheService } from './services/subscription-cache.service'

export const createSubscriptionServiceProvider = {
    provide: TYPES.services.ICreateSubscriptionService,
    useClass: CreateSubscriptionService,
}

export const servicesBillingProviders = [
  createSubscriptionServiceProvider,
  ShiraPaymentsService,
  SubscriptionCacheService,
]
