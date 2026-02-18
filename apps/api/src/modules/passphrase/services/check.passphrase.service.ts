import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassphraseEntity } from '../domain/passphrase.entity';
import { ICheckPassphraseService } from '../interfaces/services/check.passphrase.service.interface';
import { EmailNoMatchAuthException } from 'src/modules/auth/exceptions/email-no-match.passphrase.exception';


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
    
    //check passphrase is not older than 7 days
    if (entity.createdAt < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) {
      throw new UnauthorizedException("Link is expired, contact us to request a new one")
    }

    // check passphrase is not used
    if (entity.expired) {
      throw new UnauthorizedException("Link is used, contact us to request a new one")
    }

    // check registration email match with passphrase
    if (entity.usedBy !== registrationEmail) {
      throw new EmailNoMatchAuthException()
    }

    return true
  }
}