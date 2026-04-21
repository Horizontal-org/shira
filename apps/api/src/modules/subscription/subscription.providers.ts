import { StarterQuizRestrictionHandlerService } from './services/starter-quiz-restriction-handler.subscription.service';
import { TYPES } from './interfaces'
import { ShiraPaymentsLoggerService } from './services/shira-payments-logger.service'
import { ShiraPaymentsService } from './services/shira-payments.service'
import { SubscriptionCacheService } from './services/subscription-cache.service'
import { ValidateSubscriptionService } from './services/validate.subscription.service';

export const paymentsLogger = {
  provide: TYPES.services.IShiraPaymentsLoggerService,
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

export const starterQuizRestrictionHandlerService = {
  provide: TYPES.services.IStarterQuizRestrictionHandlerService,
  useClass: StarterQuizRestrictionHandlerService,
};

export const validateSubscriptionService = {
  provide: TYPES.services.IValidateSubscriptionService,
  useClass: ValidateSubscriptionService,
};

export const subscriptionServiceProviders = [
  paymentsLogger,
  shiraPayments,
  subscriptionCache,
  starterQuizRestrictionHandlerService,
  validateSubscriptionService,
]
