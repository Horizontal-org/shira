import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { IConfirmRegistrationAuthService, IValidateRegistrationAuthService, TYPES } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { RegistrationEntity } from '../domain/registration.entity';
import { Repository } from 'typeorm';
import { compareAsc, compareDesc } from 'date-fns';
import { PassphraseEntity } from 'src/modules/passphrase/domain/passphrase.entity';
import {   TYPES as TYPES_USER, ICreateUserApplication } from 'src/modules/user/interfaces';
import { Role } from 'src/modules/user/domain/role.enum';

import { ICreateSpaceService } from 'src/modules/space/interfaces/services/create.space.service.interface';
import { TYPES as TYPES_SPACE } from '../../space/interfaces'

import { IUsePassphraseService } from 'src/modules/passphrase/interfaces/services/use.passphrase.service.interface';
import { TYPES as TYPES_PASSPHRASE } from '../../passphrase/interfaces'
import { CreateSpaceDto } from 'src/modules/space/domain/create.space.dto';

@Injectable()
export class ConfirmRegistrationAuthService implements IConfirmRegistrationAuthService {
  constructor(
    @InjectRepository(RegistrationEntity)
    private readonly regRepo: Repository<RegistrationEntity>,
    @Inject(TYPES_SPACE.services.ICreateSpaceService)
    private readonly createSpaceService: ICreateSpaceService,
    @Inject(TYPES_PASSPHRASE.services.IUsePassphraseService)
    private readonly usePassphraseService: IUsePassphraseService,
    @Inject(TYPES.services.IValidateRegistrationAuthService)
    private validateRegistrationAuthService: IValidateRegistrationAuthService,
    @Inject(TYPES_USER.applications.ICreateUserApplication)
    private readonly createUserApplication: ICreateUserApplication,
  ) {}

  async execute(inviteHash: string): Promise<void> {
    
    const registration = await this.regRepo.findOne({ where: {
        invitationHash: inviteHash
    }})
    
    if (!registration) {
      throw new NotFoundException()
    }

    await this.checkRegistrationExpired(registration.expiresAt)

    await this.validateRegistrationAuthService.execute({
        email: registration.email,
        passphrase: registration.passphrase,
        password: registration.password,
        // spaceName: registration.spaceName
    })


    await this.usePassphraseService.execute(registration.passphrase, registration.email)

    const user = await this.createUserApplication.execute({
        email: registration.email,
        password: registration.password,
        role: Role.SpaceAdmin
    });

    // await this.createSpaceService.execute({
    //     name: registration.spaceName, 
    //     firstUser: user,
    //     slug: ""
    // })

    return
  }

  private async checkRegistrationExpired(expiresAt: Date){
    if (expiresAt.getTime() < new Date().getTime()) {
      throw new UnauthorizedException()
    }
  }
}
