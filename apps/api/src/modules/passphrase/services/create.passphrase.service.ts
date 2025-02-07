import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as crypto from 'crypto'
import { PassphraseEntity } from '../domain/passphrase.entity';
import { ICreatePassphraseService } from '../interfaces/services/create.passphrase.service.interface';


@Injectable()
export class CreatePassphraseService implements ICreatePassphraseService{

  constructor(
    @InjectRepository(PassphraseEntity)
    private readonly passphraseRepo: Repository<PassphraseEntity>,
  ) {}

  async execute (amount: number) {
    let passphrases = []
    for (let i = 0; i < amount; i++) {
      const passphrase = new PassphraseEntity();
      passphrase.code = crypto.randomBytes(20).toString('hex')
      passphrases.push(passphrase)
    }
    
    const passphraseEntities = await this.passphraseRepo.save(passphrases)
    
    return passphraseEntities
  }
}