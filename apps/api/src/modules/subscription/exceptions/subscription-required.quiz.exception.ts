import { HttpException, HttpStatus } from '@nestjs/common';
import { SubscriptionErrorCodes } from './errors/subscription.error-codes';

export class SubscriptionRequiredException extends HttpException {
  constructor() {
    const cause = `Subscription needed for this action`;
    super(SubscriptionErrorCodes.SubscriptionRequired, HttpStatus.FORBIDDEN, { cause });
  }
}
