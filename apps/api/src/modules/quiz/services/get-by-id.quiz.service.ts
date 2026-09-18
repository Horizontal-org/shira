import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { plainToInstance } from 'class-transformer';
import { ReadQuizDto } from '../dto/read.quiz.dto';
import { IGetByIdQuizService } from '../interfaces/services/get-by-id.quiz.service.interface';
import { TYPES } from '../interfaces';
import { IQuizItemsService } from '../interfaces/services/quiz-items.service.interface';

@Injectable()
export class GetByIdQuizService implements IGetByIdQuizService {

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
    @Inject(TYPES.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
  ) { }

  async execute(
    id,
    spaceId,
  ) {

    const quiz = await this.quizRepo
      .createQueryBuilder('quiz')
      .leftJoinAndSelect('quiz.quizQuestions', 'quiz_items')
      .where('quiz.space_id = :spaceId', { spaceId: spaceId })
      .andWhere('quiz.id = :id', { id: id })
      .getOne()

    if (!quiz) {
      return await plainToInstance(ReadQuizDto, quiz);
    }

    const hydratedItems = await this.quizItemsService.hydrate(quiz.quizQuestions ?? [], {
      questionRelations: ['apps', 'questionTranslations'],
    });
    quiz.quizQuestions = hydratedItems;

    return await plainToInstance(ReadQuizDto, quiz);
  }
}
