import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassphraseEntity } from '../domain/passphrase.entity';
import { ICheckPassphraseService } from '../interfaces/services/check.passphrase.service.interface';


@Injectable()
export class CheckPassphraseService implements ICheckPassphraseService{

  constructor(
    @InjectRepository(PassphraseEntity)
    private readonly passphraseRepo: Repository<PassphraseEntity>,
  ) {}

  async execute (passphrase: string, registrationEmail: string) {
    
    const entity = await this.passphraseRepo.findOne({ where: {
        code: passphrase,
    }})
    
    if (!entity) {
      throw new NotFoundException()
    }
    
    // check passphrase is not expired
    if (entity.expired) {
      throw new UnauthorizedException("Link is expired, contact us to request a new one")
    }

    // check registration email match with passphrase
    if (entity.usedBy !== registrationEmail) {
      throw new UnauthorizedException("Unauthorized email")
    }

    return true
  }
}