import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { plainToInstance } from 'class-transformer';
import { ReadQuizDto } from '../dto/read.quiz.dto';
import { IGetByHashQuizService } from '../interfaces/services/get-by-hash.quiz.service.interface';


@Injectable()
export class GetByHashQuizService implements IGetByHashQuizService{

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) {}

  async execute (
    hash
  ) {
    
    // TODO test sanitize
    const quiz = await this.quizRepo
        .createQueryBuilder('quiz')
        .where('hash = :hash', { hash: hash })
        .andWhere('published = 1')
        .getOne()

    if (!quiz) {
      throw new NotFoundException()
    }

    return await plainToInstance(ReadQuizDto, quiz);
  }
}