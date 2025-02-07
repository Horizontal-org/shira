import { Controller, Get, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FieldOfWork } from '../domain';


@Controller('field_of_work')
export class ListFieldOfWorkController {
  constructor(
    @InjectRepository(FieldOfWork)
    private readonly fieldsOfWorkRepository: Repository<FieldOfWork>,
  ) {}

  @Get('')
  async handler() {
    const response = this.fieldsOfWorkRepository.find()
    return response;
  }
}
