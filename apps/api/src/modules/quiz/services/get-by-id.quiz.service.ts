import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { plainToInstance } from 'class-transformer';
import { ReadQuizDto } from '../dto/read.quiz.dto';
import { IGetByIdQuizService } from '../interfaces/services/get-by-id.quiz.service.interface';
import { TYPES as TYPES_QUESTION_IMAGE} from '../../question_image/interfaces'
import { IGenerateUrlsQuestionImageService } from 'src/modules/question_image/interfaces/services/generate_urls.question_image.service.interface';

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

    const quiz = await this.quizRepo
        .createQueryBuilder('quiz')
        .leftJoinAndSelect('quiz.quizQuestions', 'quizzes_questions')
        .leftJoinAndSelect('quizzes_questions.question', 'question')
        .leftJoinAndSelect('question.questionTranslations', 'questionTranslations')
        .where('quiz.space_id = :spaceId', { spaceId: spaceId })
        .andWhere('quiz.id = :id', { id: id })
        .getOne()

    return await plainToInstance(ReadQuizDto, quiz);
  }
}