import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PassphraseEntity } from '../domain/passphrase.entity';
import { ApiLogger } from 'src/modules/learner/logger/api-logger.service';
import { GenericPassphraseErrorException } from '../exceptions';

@Controller('passphrase')
export class CheckExpiredPassphraseController {
  constructor(
    @InjectRepository(PassphraseEntity)
    private readonly passphraseRepo: Repository<PassphraseEntity>,
  ) {}

  private logger = new ApiLogger(CheckExpiredPassphraseController.name);
  
  @Get(':code/check-expired')
  async checkExpired(@Param('code') code: string) {
    try {
      const passphrase = await this.passphraseRepo.findOneOrFail({
        where: { code }
      });
  
      return {
        expired: passphrase.expired,
        exists: true,
        slug: passphrase.slug,
      };
    } catch (e) {
      this.logger.error(`Error checking expired passphrase for code: ${code}`, e);
      throw new GenericPassphraseErrorException();
    }
  }
}