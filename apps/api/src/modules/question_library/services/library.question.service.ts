import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../question/domain';

@Injectable()
export class CreateQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  async get() {
      return await this.questionRepo.find({
        where: { type: 'demo' },
      });
  }
}
