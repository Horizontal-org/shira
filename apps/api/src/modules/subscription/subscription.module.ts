import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/modules/quiz/domain/quiz.entity';
import { subscriptionControllers } from './controller';
import { subscriptionServiceProviders } from './subscription.providers';
import { redisProvider } from './providers/redis.provider';
@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
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
