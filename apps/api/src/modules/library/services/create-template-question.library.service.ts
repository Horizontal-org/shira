import { Inject, Injectable } from "@nestjs/common";
import { TYPES as TYPES_QUIZ } from "src/modules/quiz/interfaces";
import { IAddQuestionToQuizService } from "src/modules/quiz/interfaces/services/add-question-to-quiz.quiz.service.interface";
import { CreateTemplateQuestionDto } from "../dto/create-template-question.library.dto";
import { ICreateTemplateQuestionService } from "../interfaces/services/create-template-question.library.service.interface";

@Injectable()
export class CreateTemplateQuestionService implements ICreateTemplateQuestionService {
  constructor(
    @Inject(TYPES_QUIZ.services.IAddQuestionToQuizService)
    private readonly addQuestionToQuizService: IAddQuestionToQuizService,
  ) { }

  async execute(createTemplateQuestionDto: CreateTemplateQuestionDto): Promise<number> {
    return this.addQuestionToQuizService.execute({
      quizId: createTemplateQuestionDto.quizId,
      name: createTemplateQuestionDto.questionName,
      content: createTemplateQuestionDto.content,
      isPhishing: createTemplateQuestionDto.isPhishing,
      app: { id: createTemplateQuestionDto.appId },
      isFromTemplate: true,
      images: createTemplateQuestionDto.images,
      explanations: createTemplateQuestionDto.explanations,
    });
  }
}
