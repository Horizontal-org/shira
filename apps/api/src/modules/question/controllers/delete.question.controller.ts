import { Delete, Inject, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthController } from 'src/utils/decorators/auth-controller.decorator';
import { Repository } from 'typeorm';
import { Question } from '../domain';
import { QuestionTranslation } from '../../translation/domain/questionTranslation.entity';
import { Roles } from 'src/modules/auth/decorators/roles.decorators';
import { Role } from 'src/modules/user/domain/role.enum';
import { QuizItem } from 'src/modules/quiz/domain/quiz_items.entity';
import { TYPES as TYPES_QUIZ } from 'src/modules/quiz/interfaces';
import { IQuizItemsService } from 'src/modules/quiz/interfaces/services/quiz-items.service.interface';

@AuthController('question')
export class DeleteQuestionController {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(QuestionTranslation)
    private readonly questionTranslationRepository: Repository<QuestionTranslation>,
    @InjectRepository(QuizItem)
    private readonly quizItemRepository: Repository<QuizItem>,
    @Inject(TYPES_QUIZ.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
  ) { }

  @Delete(':id')
  @Roles(Role.SuperAdmin)
  async handler(
    @Param('id') id: number
  ) {
    const quizItems = await this.quizItemRepository.find({
      where: { entityType: 'question', entityId: id },
    });

    for (const quizItem of quizItems) {
      await this.quizItemsService.removeAndResequence(quizItem.quizId, quizItem.id);
    }

    await this.questionTranslationRepository.delete({ questionId: id });
    await this.questionRepository.delete(id);

    return true;
  }
}
