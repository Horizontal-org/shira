import { Inject, Injectable } from "@nestjs/common";
import { Explanation, Question } from "src/modules/question/domain";
import { QuizQuestion as QuizQuestionEntity } from "src/modules/quiz/domain/quizzes_questions.entity";
import { IDuplicateLibraryQuestionService } from "../interfaces/services/duplicate-question-library.service.interface";
import { DataSource, Repository } from "typeorm";
import { DuplicateQuestionLibraryDto } from "../dto/duplicate-question-library.dto";
import { QuestionImage } from "src/modules/question_image/domain";
import { TYPES } from "../../image/interfaces";
import { IImageService } from "src/modules/image/interfaces/services/image.service.interface";
import { ExplanationTranslation } from "src/modules/translation/domain/explanationTranslation.entity";
import { Language } from "src/modules/languages/domain/languages.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { QuestionTranslation } from "src/modules/translation/domain/questionTranslation.entity";

@Injectable()
export class DuplicateLibraryQuestionService implements IDuplicateLibraryQuestionService {
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
    @InjectRepository(QuestionTranslation)
    private readonly questionTranslationRepository: Repository<QuestionTranslation>,
    @InjectRepository(ExplanationTranslation)
    private readonly explanationTranslationRepository: Repository<ExplanationTranslation>,
    @InjectRepository(Explanation)
    private readonly explanationRepository: Repository<Explanation>,
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
      console.log("🚀 ~ get ~ originalQuestion:", originalQuestion);

      const defaultLanguage = await this.languageRepository.findOne({ where: { code: "en" } });
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

      console.log("🚀 ~ save ~ newQuestion:", newQuestion);
      const savedQuestion = await manager.save(newQuestion);


      // Question Translation
      const questionTranslation = await this.questionTranslationRepository
        .createQueryBuilder('qt')
        .where('qt.question_id = :qid AND qt.language_id = :lid', {
          qid: originalQuestion.id,
          lid: selectedLanguageId,
        })
        .getOne();

      if (questionTranslation) {
        const newTranslation = manager.create(QuestionTranslation, {
          content: questionTranslation?.content || "",
          question: savedQuestion,
          languageId: defaultLanguage.id
        });

        console.log("🚀 ~ save ~ newTranslation:", newTranslation);
        await manager.save(QuestionTranslation, newTranslation);
      }


      // Explanations and Explanation Translations
      const explanationsTranslations = await this.explanationTranslationRepository
        .createQueryBuilder('et')
        .leftJoin('et.explanation', 'e')
        .leftJoin('e.question', 'q')
        .where('q.id = :qid', { qid: originalQuestion.id })
        .andWhere('et.language_id = :lid', { lid: selectedLanguageId })
        .getOne();

      const explanation = await this.explanationRepository
        .createQueryBuilder('e')
        .where('e.question_id = :qid', { qid: originalQuestion.id })
        .getOne();

      if (explanation) {
        const newExplanation = manager.create(Explanation, {
          index: explanation.index,
          position: explanation.position,
          text: explanation.text,
          question: savedQuestion,
          explanationTranslations: [explanationsTranslations]
        });

        console.log("🚀 ~ save ~ newExplanation:", newExplanation);
        const savedExplanation = await manager.save(Explanation, newExplanation);

        const newExplanationTranslation = manager.create(ExplanationTranslation, {
          explanation: savedExplanation,
          languageId: selectedLanguageId,
          content: explanationsTranslations?.content || "",
        });

        console.log("🚀 ~ save ~ newExplanationTranslation:", newExplanationTranslation);
        await manager.save(ExplanationTranslation, newExplanationTranslation);
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

        console.log("🚀 ~ execute ~ newImage:", newImage);
        const savedImage = await manager.save(QuestionImage, newImage);
        newImageIds.push(savedImage.id);

        await this.imageService.copyAndDeleteOrigin(originalImage.relativePath, newImagePath);
      }


      // Append duplicated question to the quiz with next position
      const position = await manager.getRepository(QuizQuestionEntity).count({ where: { quizId } });

      const quizQuestion = manager.create(QuizQuestionEntity, {
        position: position + 1,
        quizId,
        questionId: savedQuestion.id,
        question: savedQuestion,
      });

      console.log("🚀 ~ save ~ quizQuestion:", quizQuestion);
      await manager.save(QuizQuestionEntity, quizQuestion);

      void newImageIds;
    });
  }
}
