import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateQuizService } from '../interfaces/services/create.quiz.service.interface';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { CreateQuizDto } from '../dto/create.quiz.dto';
import { IEditQuizService } from '../interfaces/services/edit.quiz.service.interface';
import { EditQuizDto } from '../dto/edit.quiz.dto';


@Injectable()
export class EditQuizService implements IEditQuizService{

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) {}

  async execute (editQuizDto: EditQuizDto) {
    
    const quiz = await this.quizRepo
      .createQueryBuilder('quiz')
      .where('id = :id ', { id: editQuizDto.id })
      .andWhere('space_id = :spaceId', { spaceId: editQuizDto.spaceId })
      .getOne()
      
    if (!quiz) {
      throw new NotFoundException()
    }

    await this.quizRepo.save(editQuizDto)
  }
}