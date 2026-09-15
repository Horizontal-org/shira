import { Inject, Injectable } from '@nestjs/common';
import { IReorderQuestionQuizService } from '../interfaces/services/reorder-question.quiz.service.interface';
import { ReorderQuestionQuizDto } from '../dto/reorder-question.quiz.dto';
import { TYPES } from '../interfaces';
import { IQuizItemsService, ReorderQuizItemInput } from '../interfaces/services/quiz-items.service.interface';


@Injectable()
export class ReorderQuestionQuizService implements IReorderQuestionQuizService {

  constructor(
    @Inject(TYPES.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
  ) {}

  async execute (reorderDto: ReorderQuestionQuizDto) {

    const newOrder: ReorderQuizItemInput[] = reorderDto.newOrder.map((item) => ({
      position: item.position,
      entityType: item.entityType ?? 'question',
      entityId: item.entityId ?? item.questionId,
    }));

    await this.quizItemsService.reorder(reorderDto.quizId, newOrder)
  }
}
