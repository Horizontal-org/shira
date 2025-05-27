import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './domain/plan.entity';
import { SubscriptionEntity } from './domain/subscription.entity';
@Module({
    imports: [
        TypeOrmModule.forFeature([
            PlanEntity,
            SubscriptionEntity
        ])
    ],
    controllers: [],
    providers: [],
    exports: [TypeOrmModule]
})
export class BillingModule {}