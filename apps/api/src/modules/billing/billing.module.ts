import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './domain/plan.entity';
import { SubscriptionEntity } from './domain/subscription.entity';
import { OrganizationEntity } from '../organization/domain/organization.entity';
import { OrganizationSubscriptionsEntity } from '../organization/domain/organization_subscriptions.entity';
import { billingControllers } from './controller';
import { servicesBillingProviders } from './billing.providers';
@Module({
    imports: [
        TypeOrmModule.forFeature([
            PlanEntity,
            SubscriptionEntity,
            OrganizationEntity,
            OrganizationSubscriptionsEntity
        ])
    ],
    controllers: [...billingControllers],
    providers: [...servicesBillingProviders],
    exports: [
        ...servicesBillingProviders,
        TypeOrmModule
    ]
})
export class BillingModule {}