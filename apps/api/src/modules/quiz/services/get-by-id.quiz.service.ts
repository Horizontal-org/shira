import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { plainToInstance } from 'class-transformer';
import { ReadQuizDto } from '../dto/read.quiz.dto';
import { IGetByIdQuizService } from '../interfaces/services/get-by-id.quiz.service.interface';


@Injectable()
export class GetByIdQuizService implements IGetByIdQuizService{

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) {}

  async execute (
    id,
    spaceId,
  ) {

    const quiz = this.quizRepo
        .createQueryBuilder('quiz')
        .where('space_id = :spaceId', { spaceId: spaceId })
        .andWhere('id = :id', { id: id })
        .getOne()
    
    return await plainToInstance(ReadQuizDto, quiz);
  }
}