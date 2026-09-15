import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Quiz } from '../domain/quiz.entity';
import { QuizItem } from '../domain/quiz_items.entity';
import { Note } from '../domain/note.entity';
import { IDuplicateQuizService } from '../interfaces/services/duplicate-quiz.service.interface';
import { DuplicateQuizDto } from '../dto/duplicate-quiz.dto';
import { Language } from 'src/modules/languages/domain';
import { TYPES as TYPES_QUESTION_IMAGE } from '../../question_image/interfaces'
import { ISyncQuestionImageService } from 'src/modules/question_image/interfaces/services/sync.question_image.service.interface';
import { TYPES } from '../interfaces';
import { ISharedQuestionDuplicationService } from '../interfaces/services/shared-question-duplication.service.interface';
import * as crypto from 'crypto';
import { DuplicateQuestionQuizService } from './duplicate-question.quiz.service';
import { ApiLogger } from 'src/utils/logger/api-logger.service';
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface';
import { IQuizItemsService } from '../interfaces/services/quiz-items.service.interface';

@Injectable()
export class DuplicateQuizService implements IDuplicateQuizService {

  constructor(
    @Inject(TYPES_QUESTION_IMAGE.services.ISyncQuestionImageService)
    private syncImagesService: ISyncQuestionImageService,
    @Inject(TYPES.services.ISharedQuestionDuplicationService)
    private sharedQuestionDuplicationService: ISharedQuestionDuplicationService,
    @Inject(TYPES.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService,
    @Inject(TYPES.services.IQuizItemsService)
    private quizItemsService: IQuizItemsService,
    private dataSource: DataSource
  ) { }

  private readonly logger = new ApiLogger(DuplicateQuestionQuizService.name);

  async execute(duplicateQuizDto: DuplicateQuizDto, spaceId: number): Promise<Quiz> {
    this.logger.log(`Starting duplication of quiz ID ${duplicateQuizDto.quizId} for space ID ${spaceId} with title "${duplicateQuizDto.title}" and visibility "${duplicateQuizDto.visibility}"`);

    await this.validateSpaceQuizService.execute(spaceId, duplicateQuizDto.quizId);

    return this.dataSource.transaction(async manager => {

      const originalQuiz = await manager.findOne(Quiz, {
        where: { id: duplicateQuizDto.quizId },
        relations: ['space'],
      });

      if (!originalQuiz) {
        throw new Error('Quiz not found');
      }

      const originalQuizItems = await manager.find(QuizItem, {
        where: { quizId: duplicateQuizDto.quizId },
      });

      const hydratedItems = await this.quizItemsService.hydrate(originalQuizItems, {
        questionRelations: [
          'apps',
          'explanations',
          'questionTranslations',
          'images',
          'explanations.explanationTranslations',
        ],
      });

      const newQuiz = manager.create(Quiz, {
        title: duplicateQuizDto.title,
        published: false,
        hash: crypto.randomBytes(20).toString('hex'),
        space: originalQuiz.space,
        visibility: duplicateQuizDto.visibility,
      });

      const savedQuiz = await manager.save(Quiz, newQuiz);

      const defaultLanguage = await manager.findOne(Language, { where: { code: 'en' } });
      if (!defaultLanguage) {
        throw new Error('Default language not found');
      }

      for (const originalQuizItem of hydratedItems) {
        if (originalQuizItem.entityType === 'question') {
          const originalQuestion = originalQuizItem.question;

          const duplicatedQuestion = await this.sharedQuestionDuplicationService.duplicateQuestion({
            originalQuestion,
            targetQuizId: savedQuiz.id,
            manager
          });

          if (duplicatedQuestion.imageIds.length > 0) {
            await this.syncImagesService.execute({
              imageIds: duplicatedQuestion.imageIds.map(id => id.toString()),
              questionId: duplicatedQuestion.question.id,
              quizId: savedQuiz.id
            }, manager);
          }

          const newQuizItem = manager.create(QuizItem, {
            position: originalQuizItem.position,
            quiz: savedQuiz,
            entityType: 'question',
            entityId: duplicatedQuestion.question.id,
          });

          await manager.save(QuizItem, newQuizItem);
        } else if (originalQuizItem.entityType === 'note') {
          const originalNote = originalQuizItem.note;

          const duplicatedNote = manager.create(Note, {
            name: originalNote.name,
            content: originalNote.content,
          });
          const savedNote = await manager.save(Note, duplicatedNote);

          const newQuizItem = manager.create(QuizItem, {
            position: originalQuizItem.position,
            quiz: savedQuiz,
            entityType: 'note',
            entityId: savedNote.id,
          });

          await manager.save(QuizItem, newQuizItem);
        }
      }

      return savedQuiz;
    });
  }


}
