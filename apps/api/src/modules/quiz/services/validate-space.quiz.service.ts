import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface';


@Injectable()
export class ValidateSpaceQuizService implements IValidateSpaceQuizService{

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) {}

  async execute (
    spaceId,
    quizId,
  ) {

    const quiz =  this.quizRepo
        .createQueryBuilder('quiz')
        .where('space_id = :spaceId', { spaceId: spaceId })
        .andWhere('id = :quizId', { quizId: quizId })
        .getOne()

    if (!quiz) {
      throw new NotFoundException()
    }
  }
}