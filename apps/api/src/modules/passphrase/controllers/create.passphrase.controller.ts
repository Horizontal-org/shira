import { Body, Controller, Inject, Post, Res } from '@nestjs/common';

import {
  TYPES,
} from '../interfaces';
import { ICreatePassphraseService } from '../interfaces/services/create.passphrase.service.interface';
import { CreatePassphraseDto } from '../dto';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';

@AuthController('passphrase')
export class CreatePassphraseController {
  constructor(
    @Inject(TYPES.services.ICreatePassphraseService)
    private createPassphraseService: ICreatePassphraseService,
  ) {}

  @Post()
  @Roles(Role.SuperAdmin)
  async create(@Body() createDto: CreatePassphraseDto) 
  {    
    const passphrases = await this.createPassphraseService.execute(createDto.amount)
    return passphrases
  }
}
