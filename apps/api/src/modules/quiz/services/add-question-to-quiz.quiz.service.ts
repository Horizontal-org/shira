import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, EntityManager } from "typeorm";
import { QuizQuestion as QuizQuestionEntity } from "../domain/quizzes_questions.entity";
import { Explanation, Question } from "src/modules/question/domain";
import { QuestionTranslation } from "src/modules/translation/domain/questionTranslation.entity";
import { ExplanationTranslation } from "src/modules/translation/domain/explanationTranslation.entity";
import { Language } from "src/modules/languages/domain";
import { App } from "src/modules/app/domain";
import { QuestionSanitizer } from "src/utils/question-sanitizer.util";
import { TYPES as TYPES_IMAGE } from "src/modules/image/interfaces";
import { ITransferTemplateImagesService } from "src/modules/image/interfaces/services/transfer-template-images.service.interface";
import { remapImageIds } from "src/modules/image/services/transfer-template-images.service";
import { TYPES as TYPES_QUESTION_IMAGE } from "../../question_image/interfaces";
import { ISyncQuestionImageService } from "src/modules/question_image/interfaces/services/sync.question_image.service.interface";
import {
  AddQuestionToQuizParams,
  IAddQuestionToQuizService,
} from "../interfaces/services/add-question-to-quiz.quiz.service.interface";

@Injectable()
export class AddQuestionToQuizService implements IAddQuestionToQuizService {
  constructor(
    private readonly dataSource: DataSource,
    @Inject(TYPES_IMAGE.services.ITransferTemplateImagesService)
    private readonly transferTemplateImagesService: ITransferTemplateImagesService,
    @Inject(TYPES_QUESTION_IMAGE.services.ISyncQuestionImageService)
    private readonly syncImagesService: ISyncQuestionImageService,
  ) { }

  async execute(params: AddQuestionToQuizParams, manager?: EntityManager): Promise<number> {
    if (manager) {
      return this.createQuestion(manager, params);
    }
    return this.dataSource.manager.transaction((txManager) => this.createQuestion(txManager, params));
  }

  private async createQuestion(manager: EntityManager, params: AddQuestionToQuizParams): Promise<number> {
    const quizQuestionRepo = manager.getRepository(QuizQuestionEntity);
    const questionRepo = manager.getRepository(Question);
    const appRepo = manager.getRepository(App);
    const explanationRepo = manager.getRepository(Explanation);
    const questionTranslationRepo = manager.getRepository(QuestionTranslation);
    const explanationTranslationRepo = manager.getRepository(ExplanationTranslation);
    const languageRepo = manager.getRepository(Language);

    const app = await appRepo.findOne({ where: params.app });
    if (!app) {
      const identifier = "id" in params.app ? `id ${params.app.id}` : `"${params.app.name}"`;
      throw new NotFoundException(`App with ${identifier} was not found`);
    }

    const language = await languageRepo.findOne({ where: { code: "en" } });

    const question = new Question();
    question.name = params.name;
    question.isPhising = params.isPhishing ? 1 : 0;
    question.apps = [app];
    question.languageId = language.id;
    question.content = "";
    question.type = "quiz";

    const questionEntity = await questionRepo.save(question);

    let imageIdMap = new Map<number, number>();
    if (params.isFromTemplate) {
      imageIdMap = await this.transferTemplateImagesService.transferImages(
        manager,
        params.quizId,
        questionEntity,
        params.images ?? [],
        [params.content, ...(params.explanations ?? []).map((e) => e.text)],
      );
    } else {
      const imageIds = QuestionSanitizer.extractImageIds(params.content);
      await this.syncImagesService.execute({
        imageIds,
        questionId: questionEntity.id,
        quizId: params.quizId,
      });
    }

    const sanitizedContent = remapImageIds(QuestionSanitizer.sanitizeQuestionContent(params.content), imageIdMap);

    const newQuestionTranslation = new QuestionTranslation();
    newQuestionTranslation.content = sanitizedContent;
    newQuestionTranslation.question = questionEntity;
    newQuestionTranslation.languageId = language.id;
    await questionTranslationRepo.save(newQuestionTranslation);

    for (const explanation of params.explanations ?? []) {
      const savedExplanation = await explanationRepo.save(
        explanationRepo.create({
          position: explanation.position,
          index: explanation.index,
          text: "",
          question: questionEntity,
        }),
      );

      const newExplanationTranslation = explanationTranslationRepo.create({
        explanation: savedExplanation,
        content: remapImageIds(QuestionSanitizer.sanitizeQuestionContent(explanation.text), imageIdMap),
        languageId: language.id,
      });
      await explanationTranslationRepo.save(newExplanationTranslation);
    }

    const position = await quizQuestionRepo.count({ where: { quizId: params.quizId } });

    const quizQuestion = quizQuestionRepo.create({
      position: position + 1,
      quizId: params.quizId,
      questionId: questionEntity.id,
    });
    await quizQuestionRepo.save(quizQuestion);

    return questionEntity.id;
  }
}
