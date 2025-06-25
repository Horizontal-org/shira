import { TYPES } from './interfaces'
import { CreateSubscriptionService } from './services/create-subscription.service'

export const createSubscriptionServiceProvider = {
    provide: TYPES.services.ICreateSubscriptionService,
    useClass: CreateSubscriptionService,
}

export const servicesBillingProviders = [
  createSubscriptionServiceProvider,
]