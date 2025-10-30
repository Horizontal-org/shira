import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateQuizService } from '../interfaces/services/create.quiz.service.interface';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { CreateQuizDto } from '../dto/create.quiz.dto';
import * as crypto from 'crypto'

@Injectable()
export class CreateQuizService implements ICreateQuizService {

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) { }

  async execute(createQuizDto: CreateQuizDto) {

    const quiz = new QuizEntity();
    quiz.title = createQuizDto.title;
    quiz.space = createQuizDto.space;
    quiz.hash = crypto.randomBytes(20).toString('hex');

    await this.quizRepo.save(quiz);
  }
}
