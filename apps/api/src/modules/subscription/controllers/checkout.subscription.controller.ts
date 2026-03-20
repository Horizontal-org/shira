import { Post, Body } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { ShiraPaymentsService } from '../services/shira-payments.service';
import { CreateCheckoutDto } from '../dto/create-checkout.dto';

@AuthController('subscription/checkout')
export class CheckoutSubscriptionController {
  constructor(
    private readonly shiraPaymentsService: ShiraPaymentsService,
  ) { }

  @Post()
  async handler(@Body() dto: CreateCheckoutDto) {
    return this.shiraPaymentsService.createCheckout(dto);
  }
}
