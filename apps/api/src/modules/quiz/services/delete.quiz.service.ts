import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { IDeleteQuizService } from '../interfaces/services/delete.quiz.service.interface';
import { DeleteQuizDto } from '../dto/delete.quiz.dto';


@Injectable()
export class DeleteQuizService implements IDeleteQuizService{

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) {}

  async execute (deleteQuizDto: DeleteQuizDto) {

    const quiz = await this.quizRepo
      .createQueryBuilder('quiz')
      .where('id = :id ', { id: deleteQuizDto.id })
      .andWhere('space_id = :spaceId', { spaceId: deleteQuizDto.spaceId })
      .getOne()
    
      
    if (!quiz) {
      throw new NotFoundException()
    }

    await this.quizRepo.remove(quiz)
  }
}