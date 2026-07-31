jest.mock("file-type", () => ({
  fileTypeFromBuffer: jest.fn(),
}), { virtual: true });

jest.mock("src/utils/question-sanitizer.util", () => ({
  QuestionSanitizer: {
    sanitizeQuestionContent: (html: string) => html,
    extractImageIds: jest.fn().mockReturnValue([]),
  },
}));

import { NotFoundException } from "@nestjs/common";
import { QuizQuestion as QuizQuestionEntity } from "../domain/quizzes_questions.entity";
import { Explanation, Question } from "src/modules/question/domain";
import { QuestionTranslation } from "src/modules/translation/domain/questionTranslation.entity";
import { ExplanationTranslation } from "src/modules/translation/domain/explanationTranslation.entity";
import { Language } from "src/modules/languages/domain";
import { App } from "src/modules/app/domain";
import { AddQuestionToQuizService } from "./add-question-to-quiz.quiz.service";
import { AddQuestionToQuizParams } from "../interfaces/services/add-question-to-quiz.quiz.service.interface";

describe("AddQuestionToQuizService", () => {
  let service: AddQuestionToQuizService;

  const quizQuestionRepo = { count: jest.fn().mockResolvedValue(0), create: jest.fn((d) => d), save: jest.fn(async (d) => d) };
  const questionRepo = { save: jest.fn(async (q: any) => ({ ...q, id: 100 })) };
  const appRepo = { findOne: jest.fn() };
  const explanationRepo = { save: jest.fn(async (e: any) => ({ ...e, id: 5 })), create: jest.fn((d) => d) };
  const questionTranslationRepo = { save: jest.fn(async (t: any) => t) };
  const explanationTranslationRepo = { save: jest.fn(async (t: any) => t), create: jest.fn((d) => d) };
  const languageRepo = { findOne: jest.fn().mockResolvedValue({ id: 1, code: "en" }) };

  const repoByEntity = new Map<unknown, unknown>([
    [QuizQuestionEntity, quizQuestionRepo],
    [Question, questionRepo],
    [App, appRepo],
    [Explanation, explanationRepo],
    [QuestionTranslation, questionTranslationRepo],
    [ExplanationTranslation, explanationTranslationRepo],
    [Language, languageRepo],
  ]);

  const mockManager = {
    getRepository: jest.fn((entity) => repoByEntity.get(entity)),
  };

  const mockDataSource = {
    manager: {
      transaction: jest.fn((cb) => cb(mockManager)),
    },
  };

  const transferTemplateImagesService = { transferImages: jest.fn() };
  const syncImagesService = { execute: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    quizQuestionRepo.count.mockResolvedValue(0);
    appRepo.findOne.mockResolvedValue({ id: 1, name: "Gmail" });
    languageRepo.findOne.mockResolvedValue({ id: 1, code: "en" });
    mockDataSource.manager.transaction.mockImplementation((cb) => cb(mockManager));

    service = new AddQuestionToQuizService(
      mockDataSource as any,
      transferTemplateImagesService as any,
      syncImagesService as any,
    );
  });

  const baseParams: AddQuestionToQuizParams = {
    quizId: 5,
    name: "Suspicious SMS",
    content: "<p>content</p>",
    isPhishing: true,
    app: { id: 1 },
  };

  it("resolves the app by id when given an id", async () => {
    await service.execute(baseParams);
    expect(appRepo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it("resolves the app by name when given a name", async () => {
    await service.execute({ ...baseParams, app: { name: "Gmail" } });
    expect(appRepo.findOne).toHaveBeenCalledWith({ where: { name: "Gmail" } });
  });

  it("throws NotFoundException when the app cannot be found", async () => {
    appRepo.findOne.mockResolvedValue(null);

    await expect(service.execute(baseParams)).rejects.toBeInstanceOf(NotFoundException);
    expect(questionRepo.save).not.toHaveBeenCalled();
  });

  it("opens its own transaction when no manager is passed", async () => {
    await service.execute(baseParams);

    expect(mockDataSource.manager.transaction).toHaveBeenCalledTimes(1);
  });

  it("reuses the passed-in manager instead of opening a new transaction", async () => {
    const externalManager = { getRepository: jest.fn((entity) => repoByEntity.get(entity)) } as any;

    await service.execute(baseParams, externalManager);

    expect(mockDataSource.manager.transaction).not.toHaveBeenCalled();
    expect(externalManager.getRepository).toHaveBeenCalled();
  });

  it("transfers images via the library transfer service when images are submitted", async () => {
    transferTemplateImagesService.transferImages.mockResolvedValue(new Map([[10, 999]]));

    await service.execute({
      ...baseParams,
      content: '<p><img data-image-id="10"></p>',
      images: [{ id: 10, name: "a.png", url: "https://library.example.com/a.png" }],
    });

    expect(transferTemplateImagesService.transferImages).toHaveBeenCalledTimes(1);
    expect(syncImagesService.execute).not.toHaveBeenCalled();
    expect(questionTranslationRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({ content: '<p><img data-image-id="999"></p>' }),
    );
  });

  it("falls back to the local orphan-image sync when no images are submitted", async () => {
    await service.execute(baseParams);

    expect(syncImagesService.execute).toHaveBeenCalledWith({
      imageIds: [],
      questionId: 100,
      quizId: 5,
    });
    expect(transferTemplateImagesService.transferImages).not.toHaveBeenCalled();
  });

  it("creates explanation translations and links the question at the next position", async () => {
    quizQuestionRepo.count.mockResolvedValue(2);

    const questionId = await service.execute({
      ...baseParams,
      explanations: [{ position: "top", index: "0", text: "<p>explain</p>" }],
    });

    expect(explanationRepo.save).toHaveBeenCalledTimes(1);
    expect(explanationTranslationRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({ content: "<p>explain</p>" }),
    );
    expect(quizQuestionRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({ position: 3, quizId: 5, questionId: 100 }),
    );
    expect(questionId).toBe(100);
  });
});
