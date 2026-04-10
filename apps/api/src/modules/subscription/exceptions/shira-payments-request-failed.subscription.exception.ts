import { HttpException, HttpStatus } from '@nestjs/common';
import { SubscriptionErrorCodes } from './errors/subscription.error-codes';

export class ShiraPaymentsRequestFailedException extends HttpException {
  constructor() {
    super(
      SubscriptionErrorCodes.ShiraPaymentsRequestFailed,
      HttpStatus.SERVICE_UNAVAILABLE,
      { cause: `Shira Payments request failed` },
    );
  }
}
