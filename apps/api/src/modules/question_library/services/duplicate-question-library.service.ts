import { Inject, Injectable } from "@nestjs/common";
import { Explanation, Question } from "src/modules/question/domain";
import { QuizQuestion as QuizQuestionEntity } from "src/modules/quiz/domain/quizzes_questions.entity";
import { IDuplicateLibraryQuestionService } from "../interfaces/services/duplicate-question-library.service.interface";
import { DataSource, EntityManager } from "typeorm";
import { DuplicateQuestionLibraryDto } from "../dto/duplicate-question-library.dto";
import { DuplicatedQuestionResult, DuplicateQuestionParams } from "src/modules/quiz/interfaces/services/shared-question-duplication.service.interface";
import { QuestionImage } from "src/modules/question_image/domain";
import { TYPES } from '../../image/interfaces';
import { IImageService } from "src/modules/image/interfaces/services/image.service.interface";
import { ExplanationTranslation } from "src/modules/translation/domain/explanationTranslation.entity";

@Injectable()
export class DuplicateLibraryQuestionService implements IDuplicateLibraryQuestionService {
  constructor(
    @Inject(TYPES.services.IImageService)
    private imageService: IImageService,
    private dataSource: DataSource
  ) { }

  async execute(questionId: string, dto: DuplicateQuestionLibraryDto): Promise<void> {
    const quizId = dto.quizId;
    const languageId = dto.languageId;

    return this.dataSource.transaction(async (manager) => {
      const originalQuestion = await manager.findOne(Question, {
        where: { id: parseInt(questionId, 10), type: 'demo' },
        relations: [
          'apps',
          'questionTranslations',
          'explanations',
          'explanations.explanationTranslations',
          'images',
        ],
      });

      const duplicated = await this.duplicateQuestion({
        originalQuestion,
        targetQuizId: quizId,
        languageId,
        manager,
      });

      const position = await manager
        .getRepository(QuizQuestionEntity)
        .count({ where: { quizId } });

      const quizQuestion = manager.create(QuizQuestionEntity, {
        position: position + 1,
        quizId,
        questionId: duplicated.question.id,
      });

      await manager.save(QuizQuestionEntity, quizQuestion);
    });
  }

  private async duplicateQuestion(params: DuplicateQuestionParams): Promise<DuplicatedQuestionResult> {
    const { originalQuestion, targetQuizId, languageId, manager } = params;
    const questionType: 'quiz' = 'quiz';

    const qt = await manager
      .createQueryBuilder()
      .select('qt.content', 'content')
      .from('questions_translations', 'qt')
      .where('qt.question_id = :qid AND qt.language_id = :lid', {
        qid: originalQuestion.id,
        lid: languageId,
      })
      .getRawOne<{ content?: string }>();

    const newQuestion = manager.create(Question, {
      name: originalQuestion.name,
      content: '',
      isPhising: originalQuestion.isPhising,
      languageId,
      type: questionType,
      apps: originalQuestion.apps,
    });

    const savedQuestion = await manager.save(newQuestion);

    const newImageIds = await this.duplicateExplanationsAndImages(
      originalQuestion,
      savedQuestion,
      targetQuizId,
      languageId,
      manager
    );

    return {
      question: savedQuestion,
      imageIds: newImageIds,
    };
  }

  private async duplicateExplanationsAndImages(
    originalQuestion: Question,
    savedQuestion: Question,
    targetQuizId: number,
    languageId: number,
    manager: EntityManager
  ): Promise<number[]> {
    const newImageIds: number[] = [];

    for (const explanation of originalQuestion.explanations ?? []) {
      const newExplanation = manager.create(Explanation, {
        index: explanation.index,
        position: explanation.position,
        text: explanation.text,
        question: savedQuestion,
      });

      const savedExplanation = await manager.save(Explanation, newExplanation);

      const et = await manager
        .createQueryBuilder()
        .select('et.content', 'content')
        .from('explanations_translations', 'et')
        .where('et.explanation_id = :eid AND et.language_id = :lid', {
          eid: explanation.id,
          lid: languageId,
        })
        .getRawOne<{ content?: string }>();

      if (et?.content) {
        await manager.save(ExplanationTranslation, {
          explanation: savedExplanation,
          languageId,
          content: et.content,
        });
      }

    }

    for (const originalImage of originalQuestion.images ?? []) {
      const newImagePath = this.generateNewImagePath(originalImage.relativePath, targetQuizId);

      const newImage = manager.create(QuestionImage, {
        name: originalImage.name,
        relativePath: newImagePath,
        question: savedQuestion,
        quizId: targetQuizId,
      });

      const savedImage = await manager.save(QuestionImage, newImage);
      newImageIds.push(savedImage.id);

      await this.imageService.copyAndDeleteOrigin(originalImage.relativePath, newImagePath);
    }

    return newImageIds;
  }

  private generateNewImagePath(originalPath: string, quizId: number): string {
    const timestamp = Date.now();
    const originalFileName = (originalPath.split('/').pop() ?? 'image').trim();
    const hasDot = originalFileName.includes('.');
    const fileExtension = hasDot ? originalFileName.split('.').pop() : 'png';
    const baseFileName = hasDot ? originalFileName.replace(`.${fileExtension}`, '') : originalFileName;
    const newFileName = `${timestamp}_copy_${baseFileName}.${fileExtension}`;
    return `question-images/${quizId}/${newFileName}`;
  }
}