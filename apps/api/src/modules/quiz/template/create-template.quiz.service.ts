import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import * as crypto from "crypto";
import { Quiz } from "../domain/quiz.entity";
import { PersistQuizQuestionService } from "../services/persist-question.quiz.service";
import { CreateTemplateQuizDto } from "./create-template.quiz.dto";
import { ICreateTemplateQuizService } from "./create-template.quiz.service.interface";

@Injectable()
export class CreateTemplateQuizService implements ICreateTemplateQuizService {
  constructor(
    private dataSource: DataSource,
    private persistQuizQuestionService: PersistQuizQuestionService,
  ) { }

  async execute(createTemplateQuizDto: CreateTemplateQuizDto) {
    return this.dataSource.transaction(async (manager) => {
      const quiz = manager.create(Quiz, {
        title: createTemplateQuizDto.title,
        space: createTemplateQuizDto.space,
        visibility: createTemplateQuizDto.visibility,
        hash: crypto.randomBytes(20).toString("hex"),
      });

      const savedQuiz = await manager.save(Quiz, quiz);

      for (const templateQuestion of createTemplateQuizDto.questions) {
        await this.persistQuizQuestionService.execute(manager, {
          quizId: savedQuiz.id,
          question: {
            name: templateQuestion.questionName,
            content: templateQuestion.content,
            isPhishing: templateQuestion.isPhishing,
            app: templateQuestion.appId,
          },
          explanations: templateQuestion.explanations ?? [],
        });
      }
    });
  }
}
