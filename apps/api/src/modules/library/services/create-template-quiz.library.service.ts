import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from "crypto";
import { Quiz } from "src/modules/quiz/domain/quiz.entity";
import { CreateTemplateQuizDto } from "../dto/create-template-quiz.library.dto";
import { ICreateTemplateQuizService } from "../interfaces/services/create-template-quiz.library.service.interface";
import { TYPES as TYPES_QUIZ } from "src/modules/quiz/interfaces";
import { IAddQuestionToQuizService } from "src/modules/quiz/interfaces/services/add-question-to-quiz.quiz.service.interface";

@Injectable()
export class CreateTemplateQuizService implements ICreateTemplateQuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @Inject(TYPES_QUIZ.services.IAddQuestionToQuizService)
    private readonly addQuestionToQuizService: IAddQuestionToQuizService,
  ) { }

  async execute(createTemplateQuizDto: CreateTemplateQuizDto) {
    return this.quizRepo.manager.transaction(async (manager) => {
      const quiz = manager.create(Quiz, {
        title: createTemplateQuizDto.title,
        space: createTemplateQuizDto.space,
        visibility: createTemplateQuizDto.visibility,
        hash: crypto.randomBytes(20).toString("hex"),
      });

      const savedQuiz = await manager.save(Quiz, quiz);

      for (const templateQuestion of createTemplateQuizDto.questions) {
        await this.addQuestionToQuizService.execute(
          {
            quizId: savedQuiz.id,
            name: templateQuestion.questionName,
            content: templateQuestion.content,
            isPhishing: templateQuestion.isPhishing,
            app: { name: templateQuestion.appName },
            images: templateQuestion.images,
            explanations: templateQuestion.explanations,
          },
          manager,
        );
      }

      return savedQuiz.id;
    });
  }
}
