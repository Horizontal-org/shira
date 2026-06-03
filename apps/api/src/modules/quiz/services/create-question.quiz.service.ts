import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ICreateQuestionQuizService } from '../interfaces/services/create-question.quiz.service.interface';
import { CreateQuestionQuizDto } from '../dto/create-question.quiz.dto';
import { PersistQuizQuestionService } from './persist-question.quiz.service';

@Injectable()
export class CreateQuestionQuizService implements ICreateQuestionQuizService{

  constructor(
    private dataSource: DataSource,
    private persistQuizQuestionService: PersistQuizQuestionService,
  ) {}

  async execute (createQuestionDto: CreateQuestionQuizDto) {
    await this.dataSource.transaction(async (manager) => {
      await this.persistQuizQuestionService.execute(manager, createQuestionDto);
    });
  }
}
