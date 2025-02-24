import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateQuizService } from '../interfaces/services/create.quiz.service.interface';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { CreateQuizDto } from '../dto/create.quiz.dto';
import { IListQuizService } from '../interfaces/services/list.quiz.service.interface';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ReadQuizDto } from '../dto/read.quiz.dto';


@Injectable()
export class ListQuizService implements IListQuizService{

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) {}

  async execute (
    spaceId,
  ) {

    const quizzes = this.quizRepo
        .createQueryBuilder('quiz')
        .where('space_id = :spaceId', { spaceId: spaceId })
        .getMany()
    
    return await plainToInstance(ReadQuizDto, quizzes);
  }
}