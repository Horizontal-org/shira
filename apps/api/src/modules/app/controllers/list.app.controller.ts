import { Controller, Get, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { App } from '../domain';

@Controller('app')
export class ListAppController {
  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>,
  ) {}

  @Get('')
  async handler() {
    const response = this.appRepository.find()
    return response;
  }
}
