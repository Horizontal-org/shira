import { CreateQuestionQuizService } from "./create-question.quiz.service";
import { CreateQuestionQuizDto } from "../dto/create-question.quiz.dto";

describe("CreateQuestionQuizService", () => {
  let service: CreateQuestionQuizService;

  const addQuestionToQuizService = { execute: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    service = new CreateQuestionQuizService(addQuestionToQuizService as any);
  });

  it("delegates to AddQuestionToQuizService, resolving the app by id", async () => {
    const dto: CreateQuestionQuizDto = {
      quizId: 5,
      question: {
        name: "Suspicious SMS",
        content: "<p>content</p>",
        isPhishing: true,
        app: 1,
        images: [{ id: 10, name: "a.png", url: "https://library.example.com/a.png" }],
      },
      explanations: [{ position: "top", index: "0", text: "<p>explain</p>" }],
    };

    await service.execute(dto);

    expect(addQuestionToQuizService.execute).toHaveBeenCalledWith({
      quizId: 5,
      name: "Suspicious SMS",
      content: "<p>content</p>",
      isPhishing: true,
      app: { id: 1 },
      images: dto.question.images,
      explanations: dto.explanations,
    });
  });

  it("forwards no images when none are submitted", async () => {
    const dto: CreateQuestionQuizDto = {
      quizId: 5,
      question: {
        name: "Suspicious SMS",
        content: "<p>content</p>",
        isPhishing: true,
        app: 1,
      },
      explanations: [],
    };

    await service.execute(dto);

    expect(addQuestionToQuizService.execute).toHaveBeenCalledWith(
      expect.objectContaining({ images: undefined, app: { id: 1 } }),
    );
  });
});
