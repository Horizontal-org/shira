import { Injectable } from '@nestjs/common';
import { CachedSubscription } from 'src/modules/subscription/dto/cached-response.dto';
import { SubscriptionRequiredException } from 'src/modules/subscription/exceptions';
import { IValidateSubscriptionService } from '../interfaces/services/validate.subscription.service';


@Injectable()
export class ValidateSubscriptionService implements IValidateSubscriptionService {

  constructor() {}

  async execute (
    sub
  ) {
    if (!sub || sub.status !== 'active' || sub.type !== 'pro') {
      throw new SubscriptionRequiredException()
    }
  }

}

