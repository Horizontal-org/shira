import { HttpException, HttpStatus } from '@nestjs/common';
import { SubscriptionErrorCodes } from './errors/subscription.error-codes';

export class SelfHostedFeatureDisabledException extends HttpException {
  constructor() {
    const cause = `This feature is disabled on self-hosted instances`;
    super(SubscriptionErrorCodes.SelfHostedFeatureDisabled, HttpStatus.FORBIDDEN, { cause });
  }
}
