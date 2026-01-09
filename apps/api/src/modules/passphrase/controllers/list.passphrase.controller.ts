import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';

import {
  TYPES,
} from '../interfaces';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { IListPassphraseService } from '../interfaces/services/list.passphrase.service.interface';

@AuthController('passphrase')
export class ListPassphraseController {
  constructor(
    @Inject(TYPES.services.IListPassphraseService)
    private listPassphraseService: IListPassphraseService,
  ) {}

  @Get()
  @Roles(Role.SuperAdmin)
  async list() 
  {    
    const passphrases = await this.listPassphraseService.execute()
    return passphrases
  }
}
