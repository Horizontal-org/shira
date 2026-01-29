import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Quiz } from '../domain/quiz.entity';
import { QuizQuestion } from '../domain/quizzes_questions.entity';
import { IDuplicateQuizService } from '../interfaces/services/duplicate-quiz.service.interface';
import { DuplicateQuizDto } from '../dto/duplicate-quiz.dto';
import { Language } from 'src/modules/languages/domain';
import { TYPES as TYPES_QUESTION_IMAGE } from '../../question_image/interfaces'
import { ISyncQuestionImageService } from 'src/modules/question_image/interfaces/services/sync.question_image.service.interface';
import { TYPES } from '../interfaces';
import { ISharedQuestionDuplicationService } from '../interfaces/services/shared-question-duplication.service.interface';
import * as crypto from 'crypto';
import { DuplicateQuestionQuizService } from './duplicate-question.quiz.service';
import { ApiLogger } from 'src/modules/learner/logger/api-logger.service';
import { IValidateSpaceQuizService } from '../interfaces/services/validate-space.quiz.service.interface';

@Injectable()
export class DuplicateQuizService implements IDuplicateQuizService {

  constructor(
    @Inject(TYPES_QUESTION_IMAGE.services.ISyncQuestionImageService)
    private syncImagesService: ISyncQuestionImageService,
    @Inject(TYPES.services.ISharedQuestionDuplicationService)
    private sharedQuestionDuplicationService: ISharedQuestionDuplicationService,
    @Inject(TYPES.services.IValidateSpaceQuizService)
    private validateSpaceQuizService: IValidateSpaceQuizService,
    private dataSource: DataSource
  ) { }

  private readonly logger = new ApiLogger(DuplicateQuestionQuizService.name);

  async execute(duplicateQuizDto: DuplicateQuizDto, spaceId: number): Promise<Quiz> {
    this.logger.log(`Starting duplication of quiz ID ${duplicateQuizDto.quizId} for space ID ${spaceId} with title "${duplicateQuizDto.title}" and visibility "${duplicateQuizDto.visibility}"`);

    await this.validateSpaceQuizService.execute(spaceId, duplicateQuizDto.quizId);

    return this.dataSource.transaction(async manager => {

      const originalQuiz = await manager.findOne(Quiz, {
        where: { id: duplicateQuizDto.quizId },
        relations: [
          'space',
          'quizQuestions',
          'quizQuestions.question',
          'quizQuestions.question.apps',
          'quizQuestions.question.explanations',
          'quizQuestions.question.questionTranslations',
          'quizQuestions.question.images',
          'quizQuestions.question.explanations.explanationTranslations'
        ],
      });

      if (!originalQuiz) {
        throw new Error('Quiz not found');
      }

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

      for (const originalQuizQuestion of originalQuiz.quizQuestions) {
        const originalQuestion = originalQuizQuestion.question;

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
          });
        }

        const newQuizQuestion = manager.create(QuizQuestion, {
          position: originalQuizQuestion.position,
          quiz: savedQuiz,
          question: duplicatedQuestion.question
        });

        await manager.save(QuizQuestion, newQuizQuestion);
      }

      return savedQuiz;
    });
  }


}