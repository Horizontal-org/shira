import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CachedSubscription } from '../dto/cached-response.dto';

export const SubscriptionDecorator = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): Partial<CachedSubscription> => {
    const request = ctx.switchToHttp().getRequest();
    return request.subscription;
  },
);
