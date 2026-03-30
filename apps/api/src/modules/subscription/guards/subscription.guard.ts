
import { Injectable, CanActivate, ExecutionContext, ForbiddenException, Inject } from '@nestjs/common';
import {
  TYPES as SUB_TYPES
} from '../../subscription/interfaces';
import { LoggedUserDto } from 'src/modules/user/dto/logged.user.dto';
import { ISubscriptionCacheService } from 'src/modules/subscription/interfaces/services/subscription-cache.service.interface';


@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor(
    @Inject(SUB_TYPES.services.ISubscriptionCacheService)
    private subscriptionCacheService: ISubscriptionCacheService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: LoggedUserDto = request.user


    if (!user || !user.activeOrganization) {
      throw new ForbiddenException('User does not have an active organization context');
    }

    const subscription = await this.subscriptionCacheService.getCurrentSubscription(user.activeOrganization.id + '');

    request.subscription = subscription || null
    return true
  }
}
