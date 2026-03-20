import { Post, Body } from '@nestjs/common';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { ShiraPaymentsService } from '../services/shira-payments.service';
import { ManageSubscriptionDto } from '../dto/manage-subscription.dto';

@AuthController('subscription/manage')
export class ManageSubscriptionController {
  constructor(
    private readonly shiraPaymentsService: ShiraPaymentsService,
  ) {}

  @Post()
  async handler(@Body() dto: ManageSubscriptionDto) {
    return this.shiraPaymentsService.manageSubscription(dto);
  }
}
