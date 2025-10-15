import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Explanation, Question } from "src/modules/question/domain";
import { QuizQuestion as QuizQuestionEntity } from "src/modules/quiz/domain/quizzes_questions.entity";
import { IDuplicateLibraryQuestionService } from "../interfaces/services/duplicate-question-library.service.interface";
import { DataSource, EntityManager, Repository } from "typeorm";
import { DuplicateQuestionLibraryDto } from "../dto/duplicate-question-library.dto";
import { DuplicatedQuestionResult, DuplicateQuestionParams } from "src/modules/quiz/interfaces/services/shared-question-duplication.service.interface";
import { QuestionImage } from "src/modules/question_image/domain";
import { ExplanationTranslation } from "src/modules/translation/domain/explanationTranslation.entity";
import { QuestionTranslation } from "src/modules/translation/domain/questionTranslation.entity";
import { TYPES as TYPES_IMAGE } from '../../image/interfaces';
import { IImageService } from "src/modules/image/interfaces/services/image.service.interface";

@Injectable()
export class DuplicateLibraryQuestionService implements IDuplicateLibraryQuestionService {
  constructor(
    @InjectRepository(QuizQuestionEntity)
    private readonly quizQuestionRepo: Repository<QuizQuestionEntity>,
    @Inject(TYPES_IMAGE.services.IImageService)
    private imageService: IImageService,
    private dataSource: DataSource
  ) { }

  async execute(questionId: string, dto: DuplicateQuestionLibraryDto): Promise<void> {
    console.log("🚀 ~ DuplicateLibraryQuestionService ~ execute ~ dto:", dto);

    const quizId = dto.quizId;
    const languageId = dto.languageId;
    const appId = dto.appId;

    return this.dataSource.transaction(async manager => {
      const originalQuestion = await manager.findOne(Question, {
        where: {
          id: parseInt(questionId),
          languageId: languageId,
          type: 'demo'
        },
        relations: [
          'apps',
          'explanations',
          'questionTranslations',
          'images',
          'explanations.explanationTranslations'
        ],
      });

      console.log("🚀 ~ DuplicateLibraryQuestionService ~ right before duplicateQuestion ~ lang:", languageId);
      const duplicatedQuestion = await this.duplicateQuestion({
        originalQuestion,
        targetQuizId: quizId,
        languageId: languageId,
        manager
      });

      console.log("🚀 ~ DuplicateLibraryQuestionService ~ position ~ lang:", languageId);
      const position = await this.quizQuestionRepo.count({ where: { quizId: quizId } });

      const quizQuestion = this.quizQuestionRepo.create({
        position: position + 1,
        quizId: quizId,
        questionId: duplicatedQuestion.question.id,
      });

      await manager.save(QuizQuestionEntity, quizQuestion);
    });
  }

  private async duplicateQuestion(params: DuplicateQuestionParams): Promise<DuplicatedQuestionResult> {
    const { originalQuestion, targetQuizId, languageId, manager } = params;
    const questionType = 'quiz';

    const newQuestion = manager.create(Question, {
      name: originalQuestion.name,
      content: originalQuestion.content,
      isPhising: originalQuestion.isPhising,
      languageId: languageId, // TODO check lang
      type: questionType,
      apps: originalQuestion.apps, // TODO check app
    });

    console.log("🚀 ~ DuplicateLibraryQuestionService ~ first duplicateQuestion ~ lang:", languageId);

    const savedQuestion = await manager.save(Question, newQuestion);
    console.log("🚀 ~ DuplicateLibraryQuestionService ~ after savedQuestion ~ lang:", languageId);

    const newImageIds = await this.duplicateTranslationsAndImages(
      originalQuestion, savedQuestion, targetQuizId, manager);
    console.log("🚀 ~ DuplicateLibraryQuestionService ~ second duplicateQuestion ~ lang:", languageId);

    return {
      question: savedQuestion,
      imageIds: newImageIds
    };
  }

  private async duplicateTranslationsAndImages(
    originalQuestion: Question,
    savedQuestion: Question,
    targetQuizId: number,
    manager: EntityManager
  ): Promise<number[]> {
    const newImageIds = [];
    console.log("🚀 ~ DuplicateLibraryQuestionService ~ duplicateTranslationsAndImages ~ savedQuestion:", savedQuestion);

    for (const translation of originalQuestion.questionTranslations) {
      const newTranslation = manager.create(QuestionTranslation, {
        content: translation.content,
        question: savedQuestion,
        languageId: savedQuestion.languageId // TODO check lang
      });
      await manager.save(QuestionTranslation, newTranslation);
    }
    console.log("🚀 ~ DuplicateLibraryQuestionService ~ after first for ~");

    for (const explanation of originalQuestion.explanations) {
      const newExplanation = manager.create(Explanation, {
        position: explanation.position,
        index: explanation.index,
        text: explanation.text,
        question: savedQuestion
      });
      console.log("🚀 ~ DuplicateLibraryQuestionService ~ after second for ~");

      const savedExplanation = await manager.save(Explanation, newExplanation);
      console.log("🚀 ~ DuplicateLibraryQuestionService ~ after savedExplanation ~");

      for (const explanationTranslation of explanation.explanationTranslations) {
        const newExplanationTranslation = manager.create(ExplanationTranslation, {
          content: explanationTranslation.content,
          explanation: savedExplanation,
          languageId: savedQuestion.languageId
        });
        await manager.save(ExplanationTranslation, newExplanationTranslation);
      }
      console.log("🚀 ~ DuplicateLibraryQuestionService ~ after third for ~");
    }

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

    return newImageIds;
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
