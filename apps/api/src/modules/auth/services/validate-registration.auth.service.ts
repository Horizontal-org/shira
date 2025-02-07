import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { IValidateRegistrationAuthService } from '../interfaces';
import { RegisterAuthDto } from '../domain/register.auth.dto';
import {
    IFindByUsernameUserService,
    TYPES as TYPES_USER,
  } from '../../user/interfaces';

import { TYPES as TYPES_PASSPHRASE } from '../../passphrase/interfaces'
import { TYPES as TYPES_SPACE } from '../../space/interfaces'
import { AlreadyExistUserException } from 'src/modules/user/exceptions';
import { ICheckPassphraseService } from 'src/modules/passphrase/interfaces/services/check.passphrase.service.interface';
import { ICheckSpaceService } from 'src/modules/space/interfaces/services/check.space.service.interface';

@Injectable()
export class ValidateRegistrationAuthService implements IValidateRegistrationAuthService {
  constructor(
    @Inject(TYPES_USER.services.IFindByUsernameUserService)
    private findUsername: IFindByUsernameUserService,
    @Inject(TYPES_PASSPHRASE.services.ICheckPassphraseService)
    private checkPassphrase: ICheckPassphraseService,
    @Inject(TYPES_SPACE.services.ICheckSpaceService)
    private checkSpace: ICheckSpaceService,
  ) {}

  async execute(data: RegisterAuthDto): Promise<boolean> {
      
    // check passphrase is valid
    const passphraseTaken = await this.checkPassphrase.execute(data.passphrase)
    if (passphraseTaken) {
        throw new UnauthorizedException('Passphrase taken')
    }

    // validate email is not taken
    const user = await this.findUsername.execute(data.email)
    if (user) {
      throw new AlreadyExistUserException(data.email);      
    }

    // check space name is available
    const spaceTaken = await this.checkSpace.execute(data.spaceName)
    if (spaceTaken) {
        throw new UnauthorizedException('Space taken')
    }

    return true
  }
}
