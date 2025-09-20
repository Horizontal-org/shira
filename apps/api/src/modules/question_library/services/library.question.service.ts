import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../question/domain';

@Injectable()
export class GetLibraryQuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}

  async get() {
      let questions = await this.questionRepo.find({
        where: { type: 'demo' },
      });

      console.log("questions:", questions);
      return questions;
  }
}
