import { Injectable, CanActivate } from '@nestjs/common';
import { SELF_HOSTED } from 'src/utils/environment/self-hosted.environment';
import { SelfHostedFeatureDisabledException } from '../exceptions';

@Injectable()
export class SelfHostedDisabledGuard implements CanActivate {
  canActivate(): boolean {
    if (SELF_HOSTED) {
      throw new SelfHostedFeatureDisabledException();
    }

    return true;
  }
}
