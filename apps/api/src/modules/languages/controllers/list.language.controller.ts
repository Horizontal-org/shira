import { Controller, Get, Param, ParseArrayPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../domain';

@Controller('language')
export class ListLanguageController {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepo: Repository<Language>,
  ) {}

  @Get('')
  async handler() {
    const res = await this.languageRepo.find()
    return res
  }

}
