import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../../question/domain/question.entity';
import { IGetLibraryQuestionService } from '../interfaces/services/question-library.service.interface';

@Injectable()
export class GetLibraryQuestionService implements IGetLibraryQuestionService {
    private readonly logger = new Logger(GetLibraryQuestionService.name);
  
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
  ) {}
  
  async execute() {
    this.logger.log("questions", await this.questionRepo.find)
    let questions = await this.questionRepo.find({
        where: { type: 'demo' },
      });

      return questions;
  }
}
