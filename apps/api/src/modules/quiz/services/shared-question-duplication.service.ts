import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Question, Explanation } from 'src/modules/question/domain';
import { QuestionTranslation } from 'src/modules/translation/domain/questionTranslation.entity';
import { ExplanationTranslation } from 'src/modules/translation/domain/explanationTranslation.entity';
import { Language } from 'src/modules/languages/domain';
import { QuestionImage } from 'src/modules/question_image/domain/question_images.entity';
import { TYPES as TYPES_IMAGE } from '../../image/interfaces';
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface';
import {
  ISharedQuestionDuplicationService,
  DuplicateQuestionParams,
  DuplicatedQuestionResult
} from '../interfaces/services/shared-question-duplication.service.interface';

@Injectable()
export class SharedQuestionDuplicationService implements ISharedQuestionDuplicationService {

  constructor(
    @Inject(TYPES_IMAGE.services.IImageService)
    private imageService: IImageService
  ) {}

  async duplicateQuestion(params: DuplicateQuestionParams): Promise<DuplicatedQuestionResult> {
    const { originalQuestion, newQuestionName, targetQuizId, manager } = params;

    const defaultLanguage = await manager.findOne(Language, { where: { code: 'en' } });
    if (!defaultLanguage) {
      throw new Error('Default language not found');
    }

    const newQuestion = manager.create(Question, {
      name: newQuestionName || originalQuestion.name,
      content: originalQuestion.content,
      isPhising: originalQuestion.isPhising,
      languageId: originalQuestion.languageId || defaultLanguage.id,
      type: originalQuestion.type,
      apps: originalQuestion.apps
    });

    const savedQuestion = await manager.save(Question, newQuestion);

    for (const translation of originalQuestion.questionTranslations) {
      const newTranslation = manager.create(QuestionTranslation, {
        content: translation.content,
        question: savedQuestion,
        languageId: translation.languageId || defaultLanguage.id
      });
      await manager.save(QuestionTranslation, newTranslation);
    }

    for (const explanation of originalQuestion.explanations) {
      const newExplanation = manager.create(Explanation, {
        position: explanation.position,
        index: explanation.index,
        text: explanation.text,
        question: savedQuestion
      });

      const savedExplanation = await manager.save(Explanation, newExplanation);

      for (const explanationTranslation of explanation.explanationTranslations) {
        const newExplanationTranslation = manager.create(ExplanationTranslation, {
          content: explanationTranslation.content,
          explanation: savedExplanation,
          languageId: explanationTranslation.languageId || defaultLanguage.id
        });
        await manager.save(ExplanationTranslation, newExplanationTranslation);
      }
    }

    const newImageIds = [];
    for (const originalImage of originalQuestion.images) {
      const newImagePath = this.generateNewImagePath(originalImage.relativePath, targetQuizId);

      const newImage = manager.create(QuestionImage, {
        name: originalImage.name,
        relativePath: newImagePath,
        question: savedQuestion,
        quizId: targetQuizId
      });

      const savedImage = await manager.save(QuestionImage, newImage);
      newImageIds.push(savedImage.id);

      await this.imageService.copyAndDeleteOrigin(originalImage.relativePath, newImagePath);
    }

    return {
      question: savedQuestion,
      imageIds: newImageIds
    };
  }

  private generateNewImagePath(originalPath: string, quizId: number): string {
    const timestamp = Date.now();
    const originalFileName = originalPath.split('/').pop();
    const fileExtension = originalFileName.split('.').pop();
    const baseFileName = originalFileName.replace(`.${fileExtension}`, '');

    const newFileName = `${timestamp}_copy_${baseFileName}.${fileExtension}`;
    return `question-images/${quizId}/${newFileName}`;
  }
}