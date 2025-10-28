import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { IEditQuizService } from '../interfaces/services/edit.quiz.service.interface';
import { EditQuizDto } from '../dto/edit.quiz.dto';
import { InvalidFieldException } from '../exceptions/invalid-field.quiz.exception';


@Injectable()
export class EditQuizService implements IEditQuizService {

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) { }

  async execute(editQuizDto: EditQuizDto) {

    if (editQuizDto.title == null || editQuizDto.published == null)
      throw new InvalidFieldException();

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