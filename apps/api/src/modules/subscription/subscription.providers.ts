import { TYPES } from './interfaces'
import { ShiraPaymentsLoggerService } from './services/shira-payments-logger.service'
import { ShiraPaymentsService } from './services/shira-payments.service'
import { SubscriptionCacheService } from './services/subscription-cache.service'


export const paymentsLogger = {
  provide: TYPES.services.IShiraPaymentsLoggerService ,
  useClass: ShiraPaymentsLoggerService,
};

export const shiraPayments = {
  provide: TYPES.services.IShiraPaymentsService,
  useClass: ShiraPaymentsService,
};

export const subscriptionCache = {
  provide: TYPES.services.ISubscriptionCacheService,
  useClass: SubscriptionCacheService,
};

export const subscriptionServiceProviders = [
  paymentsLogger,
  shiraPayments,
  subscriptionCache
]
