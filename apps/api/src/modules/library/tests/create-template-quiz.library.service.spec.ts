import { Quiz } from "src/modules/quiz/domain/quiz.entity";
import { CreateTemplateQuizService } from "../services/create-template-quiz.library.service";
import { CreateTemplateQuizDto } from "../dto/create-template-quiz.library.dto";
import { QuizVisibility } from "src/modules/quiz/dto/quiz-visibility-enum.quiz";

describe("CreateTemplateQuizService", () => {
  let service: CreateTemplateQuizService;

  const addQuestionToQuizService = { execute: jest.fn().mockResolvedValue(100) };

  const mockManager = {
    create: jest.fn((_entity, data) => data),
    save: jest.fn(async (_entity, data) => ({ ...data, id: 1 })),
  };

  const mockQuizRepo = {
    manager: {
      transaction: jest.fn((cb) => cb(mockManager)),
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockQuizRepo.manager.transaction.mockImplementation((cb) => cb(mockManager));

    service = new CreateTemplateQuizService(mockQuizRepo as any, addQuestionToQuizService as any);
  });

  it("creates the quiz then delegates each question to AddQuestionToQuizService, resolving the app by name", async () => {
    const dto: CreateTemplateQuizDto = {
      title: "Phishing basics",
      visibility: QuizVisibility.Private,
      questions: [
        {
          questionName: "Suspicious SMS",
          content: '<p>See <img data-image-id="10"></p>',
          isPhishing: true,
          appName: "Gmail",
          explanations: [
            { position: "top", index: "0", text: '<p><img data-image-id="10"></p>' },
          ],
          images: [{ id: 10, name: "a.png", url: "https://library.example.com/a.png" }],
        },
      ],
    };

    const quizId = await service.execute(dto);

    expect(addQuestionToQuizService.execute).toHaveBeenCalledTimes(1);
    expect(addQuestionToQuizService.execute).toHaveBeenCalledWith(
      {
        quizId: 1,
        name: "Suspicious SMS",
        content: dto.questions[0].content,
        isPhishing: true,
        app: { name: "Gmail" },
        images: dto.questions[0].images,
        explanations: dto.questions[0].explanations,
      },
      mockManager,
    );
    expect(quizId).toBe(1);
  });

  it("delegates each question in a multi-question quiz within the same transaction manager", async () => {
    const dto: CreateTemplateQuizDto = {
      title: "Phishing basics",
      visibility: QuizVisibility.Private,
      questions: [
        { questionName: "Q1", content: "<p>1</p>", isPhishing: true, appName: "Gmail" },
        { questionName: "Q2", content: "<p>2</p>", isPhishing: false, appName: "Outlook" },
      ],
    };

    await service.execute(dto);

    expect(addQuestionToQuizService.execute).toHaveBeenCalledTimes(2);
    expect(addQuestionToQuizService.execute.mock.calls[0][1]).toBe(mockManager);
    expect(addQuestionToQuizService.execute.mock.calls[1][1]).toBe(mockManager);
  });
});
