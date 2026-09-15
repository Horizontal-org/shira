import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz as QuizEntity } from '../domain/quiz.entity';
import { IDeleteQuestionQuizService } from '../interfaces/services/delete-question.quiz.service.interface';
import { DeleteQuestionQuizDto } from '../dto/delete-question.quiz.dto';
import { QuizItem } from '../domain/quiz_items.entity';
import { QuestionTranslation } from 'src/modules/translation/domain/questionTranslation.entity';
import { Question } from 'src/modules/question/domain';
import { TYPES } from '../interfaces';
import { IQuizItemsService } from '../interfaces/services/quiz-items.service.interface';


@Injectable()
export class DeleteQuestionQuizService implements IDeleteQuestionQuizService {

  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepo: Repository<QuizEntity>,
    @InjectRepository(QuizItem)
    private readonly quizItemRepo: Repository<QuizItem>,
    @InjectRepository(QuestionTranslation)
    private readonly questionTranslationRepo: Repository<QuestionTranslation>,
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @Inject(TYPES.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
  ) {}

  async execute (deleteDto: DeleteQuestionQuizDto) {

    const quizItem = await this.quizItemRepo.findOne({
      where: {
        quizId: deleteDto.quizId,
        entityType: 'question',
        entityId: deleteDto.questionId,
      },
    });

    if (!quizItem) {
      throw new NotFoundException()
    }

    const quiz = await this.quizRepo.findOneBy({ id: deleteDto.quizId })

    quiz.updatedAt = new Date()
    await this.quizRepo.save(quiz)

    await this.quizItemsService.removeAndResequence(deleteDto.quizId, quizItem.id)

    await this.questionTranslationRepo.delete({ 'questionId': deleteDto.questionId })
    await this.questionRepo.delete(deleteDto.questionId);

  }
}
