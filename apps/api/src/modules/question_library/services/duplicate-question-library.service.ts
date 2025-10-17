import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { QuizQuestion as QuizQuestionEntity } from "src/modules/quiz/domain/quizzes_questions.entity";
import { IDuplicateLibraryQuestionService } from "../interfaces/services/duplicate-question-library.service.interface";
import { DuplicateQuestionLibraryDto } from "../dto/duplicate-question-library.dto";
import { Explanation, Question } from "src/modules/question/domain";
import { QuestionImage } from "src/modules/question_image/domain";
import { TYPES } from "../../image/interfaces";
import { IImageService } from "src/modules/image/interfaces/services/image.service.interface";
import { ExplanationTranslation } from "src/modules/translation/domain/explanationTranslation.entity";
import { Language } from "src/modules/languages/domain/languages.entity";
import { QuestionTranslation } from "src/modules/translation/domain/questionTranslation.entity";

@Injectable()
export class DuplicateLibraryQuestionService implements IDuplicateLibraryQuestionService {
  constructor(
    @Inject(TYPES.services.IImageService)
    private imageService: IImageService,
    private dataSource: DataSource
  ) { }

  async execute(questionId: string, dto: DuplicateQuestionLibraryDto): Promise<void> {
    const quizId = dto.quizId;
    const selectedLanguageId = dto.languageId;

    await this.dataSource.transaction(async (manager) => {

      // Original question
      const originalQuestion = await manager.findOne(Question, {
        where: { id: parseInt(questionId), type: "demo" },
        relations: [
          "apps",
          "questionTranslations",
          "explanations",
          "explanations.explanationTranslations",
          "images",
        ],
      });

      if (!originalQuestion) throw new Error("Original question not found");

      const defaultLanguage = await manager.findOne(Language, { where: { code: "en" } });
      if (!defaultLanguage) throw new Error("Default language not found");


      // Duplicate Question (type 'quiz')
      const newQuestion = manager.create(Question, {
        name: originalQuestion.name,
        content: "",
        isPhising: originalQuestion.isPhising,
        languageId: defaultLanguage.id,
        type: "quiz",
        apps: originalQuestion.apps,
      });

      const savedQuestion = await manager.save(newQuestion);


      // Question Translation
      const questionTranslation = await manager
        .createQueryBuilder(QuestionTranslation, 'qt')
        .where('qt.question_id = :qid', { qid: questionId })
        .andWhere('qt.language_id = :lid', { lid: selectedLanguageId })
        .getOne();

      if (questionTranslation) {
        const newTranslation = manager.create(QuestionTranslation, {
          content: questionTranslation?.content || "",
          question: savedQuestion,
          languageId: defaultLanguage.id
        });

        await manager.save(QuestionTranslation, newTranslation);
      }


      // Explanations and Explanation Translations
      const explanations = await manager
        .createQueryBuilder(Explanation, 'e')
        .where('e.question_id = :qid', { qid: questionId })
        .getMany();

      if (explanations) {
        for (const exp of explanations) {
          const savedExplanation = await manager.save(
            manager.create(
              Explanation, {
              index: exp.index,
              position: exp.position,
              text: exp.text,
              question: savedQuestion,
            }));

          const explanationsTranslation = await manager
            .createQueryBuilder(ExplanationTranslation, 'et')
            .leftJoin('et.explanation', 'e')
            .leftJoin('e.question', 'q')
            .where('q.id = :qid', { qid: questionId })
            .andWhere('et.language_id = :lid', { lid: selectedLanguageId })
            .andWhere('e.id = :eid', { eid: exp.id })
            .getOne();

          await manager.save(
            manager.create(ExplanationTranslation, {
              content: explanationsTranslation?.content,
              explanation: savedExplanation,
              languageId: defaultLanguage.id,
            }));
        }
      }


      // Images
      const newImageIds = [];

      for (const originalImage of originalQuestion.images ?? []) {
        const timestamp = Date.now();
        const originalFileName = (originalImage.relativePath.split("/").pop() ?? "image").trim();
        const hasDot = originalFileName.includes(".");
        const fileExtension = hasDot ? originalFileName.split(".").pop() : "png";
        const baseFileName = hasDot
          ? originalFileName.replace(`.${fileExtension}`, "")
          : originalFileName;
        const newFileName = `${timestamp}_copy_${baseFileName}.${fileExtension}`;
        const newImagePath = `question-images/${quizId}/${newFileName}`;

        const newImage = manager.create(QuestionImage, {
          name: originalImage.name,
          relativePath: newImagePath,
          question: savedQuestion,
          quizId: quizId,
        });

        const savedImage = await manager.save(QuestionImage, newImage);
        newImageIds.push(savedImage.id);

        await this.imageService.copyAndDeleteOrigin(originalImage.relativePath, newImagePath);
      }


      // Relation -> duplicated question to the quiz
      const position = await manager.getRepository(QuizQuestionEntity).count({ where: { quizId } });

      const quizQuestion = manager.create(QuizQuestionEntity, {
        position: position + 1,
        quizId,
        questionId: savedQuestion.id,
        question: savedQuestion,
      });

      await manager.save(QuizQuestionEntity, quizQuestion);
    });
  }
}
