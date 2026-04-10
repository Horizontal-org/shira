import { Module } from '@nestjs/common'
import { subscriptionControllers } from './controller';
import { subscriptionServiceProviders } from './subscription.providers';
import { redisProvider } from './providers/redis.provider';
@Module({
  controllers: [...subscriptionControllers],
  providers: [
    ...subscriptionServiceProviders,
    redisProvider,
  ],
  exports: [
    ...subscriptionServiceProviders,
  ]
})
export class SubscriptionModule { }
