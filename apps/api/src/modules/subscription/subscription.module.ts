import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ShiraPaymentsService } from './services/shira-payments.service';
import { ManageSubscriptionController } from './controllers/manage.subscription.controller';
import { CheckoutSubscriptionController } from './controllers/checkout.subscription.controller';
@Module({
  imports: [HttpModule],
  controllers: [
    ManageSubscriptionController,
    CheckoutSubscriptionController,
  ],
  providers: [ShiraPaymentsService],
})
export class SubscriptionModule {}
