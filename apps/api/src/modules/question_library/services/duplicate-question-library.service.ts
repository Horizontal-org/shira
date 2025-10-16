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

    return this.dataSource.transaction(async manager => {
      const originalQuestion = await manager.findOne(Question, {
        where: {
          id: parseInt(questionId),
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

      const duplicatedQuestion = await this.duplicateQuestion({
        originalQuestion,
        targetQuizId: quizId,
        languageId: languageId,
        manager
      });

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

    const targetQTrans = originalQuestion.questionTranslations
      ?.find(t => t.languageId === languageId);

    const newQuestion = manager.create(Question, {
      name: originalQuestion.name,
      content: targetQTrans?.content,
      isPhising: originalQuestion.isPhising,
      languageId,
      type: questionType,
      apps: originalQuestion.apps,
    });

    const savedQuestion = await manager.save(Question, newQuestion);

    const newImageIds = await this.duplicateTranslationsAndImages(
      originalQuestion, savedQuestion, targetQuizId, languageId, manager);

    return {
      question: savedQuestion,
      imageIds: newImageIds
    };
  }

  private async duplicateTranslationsAndImages(
    originalQuestion: Question,
    savedQuestion: Question,
    targetQuizId: number,
    languageId: number,
    manager: EntityManager
  ): Promise<number[]> {
    const newImageIds = [];

    const targetQTrans = originalQuestion.questionTranslations?.find(t => t.languageId === languageId);
    if (targetQTrans) {
      const newTranslation = manager.create(QuestionTranslation, {
        content: targetQTrans.content,
        question: savedQuestion,
        languageId,
      });
      await manager.save(QuestionTranslation, newTranslation);
    }

    for (const explanation of originalQuestion.explanations) {
      const et = explanation.explanationTranslations
        ?.find(tr => tr.languageId === languageId);

      const newExplanation = manager.create(Explanation, {
        position: explanation.position,
        index: explanation.index,
        text: et.content,
        question: savedQuestion
      });

      const savedExplanation = await manager.save(Explanation, newExplanation);

      for (const explanationTranslation of explanation.explanationTranslations) {
        const newExplanationTranslation = manager.create(ExplanationTranslation, {
          content: explanationTranslation.content,
          explanation: savedExplanation,
          languageId: savedQuestion.languageId
        });
        await manager.save(ExplanationTranslation, newExplanationTranslation);
      }
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
