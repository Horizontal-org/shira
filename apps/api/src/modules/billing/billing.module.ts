import { Module } from '@nestjs/common'
import { billingControllers } from './controller';
import { servicesBillingProviders } from './billing.providers';
import { redisProvider } from './providers/redis.provider';
@Module({
  controllers: [...billingControllers],
  providers: [
    ...servicesBillingProviders,
    redisProvider,
  ],
  exports: [
    ...servicesBillingProviders,
  ]
})
export class BillingModule { }
