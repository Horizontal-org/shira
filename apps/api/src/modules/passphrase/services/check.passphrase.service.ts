import { Injectable, NotFoundException } from '@nestjs/common';
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

  async execute (passphrase: string) {
    
    const entity = await this.passphraseRepo.findOne({ where: {
        code: passphrase,
    }})
    
    if (!entity) {
      throw new NotFoundException()
    }
    return !!(entity.usedBy)
  }
}