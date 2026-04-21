import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { IValidateQuizNameService } from '../interfaces/services/validate-name.quiz.service.interface';
import { AlreadyExistsQuizNameException } from '../exceptions';

@Injectable()
export class ValidateQuizNameService implements IValidateQuizNameService {

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
  ) { }

  async execute(name: string, spaceId: number): Promise<void> {
    const existingQuiz = await this.quizRepo.findOne({
      where: { title: name, space: { id: spaceId } }
    });

    if (existingQuiz) {
      throw new AlreadyExistsQuizNameException(name);
    }
  }
}