import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import * as crypto from "crypto";
import { Quiz } from "../domain/quiz.entity";
import { QuizQuestion as QuizQuestionEntity } from "../domain/quizzes_questions.entity";
import { CreateTemplateQuizDto, CreateTemplateQuizQuestionDto } from "./create-template.quiz.dto";
import { ICreateTemplateQuizService } from "./create-template.quiz.service.interface";
import { Explanation, Question } from "src/modules/question/domain";
import { QuestionTranslation } from "src/modules/translation/domain/questionTranslation.entity";
import { ExplanationTranslation } from "src/modules/translation/domain/explanationTranslation.entity";
import { Language } from "src/modules/languages/domain";
import { App } from "src/modules/app/domain";
import { QuestionSanitizer } from "src/utils/question-sanitizer.util";

@Injectable()
export class CreateTemplateQuizService implements ICreateTemplateQuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
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
        await this.createQuestion(manager, savedQuiz.id, templateQuestion);
      }

      return savedQuiz.id;
    });
  }

  private async createQuestion(
    manager: EntityManager,
    quizId: number,
    templateQuestion: CreateTemplateQuizQuestionDto,
  ): Promise<void> {
    const quizQuestionRepo = manager.getRepository(QuizQuestionEntity);
    const questionRepo = manager.getRepository(Question);
    const appRepo = manager.getRepository(App);
    const explanationRepo = manager.getRepository(Explanation);
    const questionTranslationRepo = manager.getRepository(QuestionTranslation);
    const explanationTranslationRepo = manager.getRepository(ExplanationTranslation);
    const languageRepo = manager.getRepository(Language);

    let question: Question;

    const app = await appRepo.findOne({
      where: { name: templateQuestion.appName },
    });

    if (!app) {
      throw new NotFoundException(`App "${templateQuestion.appName}" was not found`);
    }

    const language = await languageRepo.findOne({
      where: { code: "en" },
    });

    question = new Question();
    question.name = templateQuestion.questionName;
    question.isPhising = templateQuestion.isPhishing ? 1 : 0;
    question.apps = [app];
    question.languageId = language.id;
    question.content = "";
    question.type = "quiz";

    const questionEntity = await questionRepo.save(question);

    // TODO check how to manage images

    const originalContent = templateQuestion.content;
    const sanitizedContent = QuestionSanitizer.sanitizeQuestionContent(originalContent);

    const newQuestionTranslation = new QuestionTranslation();
    newQuestionTranslation.content = sanitizedContent;
    newQuestionTranslation.question = questionEntity;
    newQuestionTranslation.languageId = language.id;
    await questionTranslationRepo.save(newQuestionTranslation);

    for (const explanation of templateQuestion.explanations ?? []) {
      const savedExplanation = await explanationRepo.save(
        explanationRepo.create({
          position: explanation.position,
          index: explanation.index,
          text: "",
          question: questionEntity,
        })
      );

      const newExplanationTranslation =
        explanationTranslationRepo.create({
          explanation: savedExplanation,
          content: QuestionSanitizer.sanitizeQuestionContent(explanation.text),
          languageId: language.id,
        });
      await explanationTranslationRepo.save(newExplanationTranslation);
    }

    const position = await quizQuestionRepo.count({
      where: { quizId },
    });

    const quizQuestion = quizQuestionRepo.create({
      position: position + 1,
      quizId,
      questionId: questionEntity.id,
    });
    await quizQuestionRepo.save(quizQuestion);
  }
}
