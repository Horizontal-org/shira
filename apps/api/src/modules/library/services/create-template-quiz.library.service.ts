import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from "crypto";
import { Quiz } from "src/modules/quiz/domain/quiz.entity";
import { CreateTemplateQuizDto } from "../dto/create-template-quiz.library.dto";
import { ICreateTemplateQuizService } from "../interfaces/services/create-template-quiz.library.service.interface";
import { TYPES as TYPES_QUIZ } from "src/modules/quiz/interfaces";
import { IAddQuestionToQuizService } from "src/modules/quiz/interfaces/services/add-question-to-quiz.quiz.service.interface";
import { Note } from "src/modules/note/domain";
import { NoteImage } from "src/modules/note_image/domain";
import { QuizItem } from "src/modules/quiz/domain/quiz_items.entity";
import { QuestionSanitizer } from "src/utils/question-sanitizer.util";
import { IImageService } from "src/modules/image/interfaces/services/image.service.interface";
import { TYPES as TYPES_IMAGE } from "src/modules/image/interfaces";
import { remapImageIds } from "src/modules/image/services/transfer-template-images.service";

@Injectable()
export class CreateTemplateQuizService implements ICreateTemplateQuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @Inject(TYPES_QUIZ.services.IAddQuestionToQuizService)
    private readonly addQuestionToQuizService: IAddQuestionToQuizService,
    @Inject(TYPES_IMAGE.services.IImageService)
    private readonly imageService: IImageService,
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

      const items = [
        ...createTemplateQuizDto.questions.map((question, index) => ({
          entityType: "question" as const,
          position: question.position ?? index + 1,
          question,
        })),
        ...(createTemplateQuizDto.notes ?? []).map((note) => ({
          entityType: "note" as const,
          position: note.position,
          note,
        })),
      ].sort((a, b) => a.position - b.position);

      for (const item of items) {
        if (item.entityType === "note") {
          const note = await manager.save(Note, manager.create(Note, {
            name: item.note.name,
            content: "",
          }));
          const imageIdMap = new Map<number, number>();
          for (const sourceImage of item.note.images ?? []) {
            const response = await fetch(sourceImage.url);
            if (!response.ok) throw new Error(`Failed to download template image ${sourceImage.id}: ${response.status}`);
            const buffer = Buffer.from(await response.arrayBuffer());
            const name = `${crypto.randomUUID()}_${sourceImage.name}`;
            const relativePath = `note-images/${savedQuiz.id}/${name}`;
            await this.imageService.upload({
              file: { buffer, size: buffer.length } as Express.Multer.File,
              fileName: name,
              filePath: relativePath,
            });
            const savedImage = await manager.save(NoteImage, manager.create(NoteImage, {
              name,
              relativePath,
              noteId: note.id,
              quizId: savedQuiz.id,
            }));
            imageIdMap.set(sourceImage.id, savedImage.id);
          }
          note.content = remapImageIds(
            QuestionSanitizer.sanitizeQuestionContent(item.note.content),
            imageIdMap,
          );
          await manager.save(Note, note);
          await manager.save(QuizItem, manager.create(QuizItem, {
            quizId: savedQuiz.id,
            entityType: "note",
            entityId: note.id,
            position: item.position,
          }));
          continue;
        }

        const templateQuestion = item.question;
        await this.addQuestionToQuizService.execute(
          {
            quizId: savedQuiz.id,
            name: templateQuestion.questionName,
            content: templateQuestion.content,
            isPhishing: templateQuestion.isPhishing,
            app: { name: templateQuestion.appName },
            isFromTemplate: true,
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
