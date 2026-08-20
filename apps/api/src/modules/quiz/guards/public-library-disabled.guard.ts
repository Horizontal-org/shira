import { Injectable, CanActivate } from '@nestjs/common';
import { PUBLIC_LIBRARY_ENABLED } from 'src/utils/environment/public-library.environment';
import { PublicLibraryDisabledException } from '../exceptions';

@Injectable()
export class PublicLibraryDisabledGuard implements CanActivate {
  canActivate(): boolean {
    if (!PUBLIC_LIBRARY_ENABLED) {
      throw new PublicLibraryDisabledException();
    }

    return true;
  }
}
