import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassphraseEntity } from '../domain/passphrase.entity';

@Controller('passphrase')
export class CheckExpiredPassphraseController {
  constructor(
    @InjectRepository(PassphraseEntity)
    private readonly passphraseRepo: Repository<PassphraseEntity>,
  ) {}

  @Get(':code/check-expired')
  async checkExpired(@Param('code') code: string) {
    const passphrase = await this.passphraseRepo.findOne({
      where: { code }
    });

    if (!passphrase) {
      throw new HttpException('Passphrase not found', HttpStatus.NOT_FOUND);
    }

    return {
      expired: passphrase.expired,
      exists: true
    };
  }
}