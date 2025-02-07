import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PassphraseEntity } from '../domain/passphrase.entity';
import { IUsePassphraseService } from '../interfaces/services/use.passphrase.service.interface';


@Injectable()
export class UsePassphraseService implements IUsePassphraseService{

  constructor(
    @InjectRepository(PassphraseEntity)
    private readonly passphraseRepo: Repository<PassphraseEntity>,
  ) {}

  async execute (code: string, usedBy: string) {    
    const passphraseEntity = await this.passphraseRepo.findOneOrFail({ where: {
      code: code
    }})

    passphraseEntity.usedBy = usedBy
    await this.passphraseRepo.save(passphraseEntity)

    return 
  }
}