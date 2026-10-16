import { Inject, Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import { EntityManager } from "typeorm";
import { TYPES as TYPES_IMAGE } from "src/modules/image/interfaces";
import { IImageService } from "src/modules/image/interfaces/services/image.service.interface";
import { remapImageIds } from "src/modules/image/utils/remap-image-ids.util";
import { Note } from "src/modules/note/domain";
import { NoteImage } from "src/modules/note_image/domain";
import { QuizItem } from "src/modules/quiz/domain/quiz_items.entity";
import { QuestionSanitizer } from "src/utils/question-sanitizer.util";
import { CreateTemplateQuizNoteDto } from "../dto/create-template-quiz.library.dto";

interface CreateNoteFromTemplateParams {
  manager: EntityManager;
  quizId: number;
  position: number;
  template: CreateTemplateQuizNoteDto;
}

@Injectable()
export class CreateNoteFromTemplateService {
  constructor(
    @Inject(TYPES_IMAGE.services.IImageService)
    private readonly imageService: IImageService,
  ) { }

  async execute({ manager, quizId, position, template }: CreateNoteFromTemplateParams): Promise<Note> {
    const note = await manager.save(Note, manager.create(Note, {
      name: template.name,
      content: "",
    }));

    const imageIdMap = new Map<number, number>();
    for (const sourceImage of template.images ?? []) {
      const response = await fetch(sourceImage.url);
      if (!response.ok) {
        throw new Error(`Failed to download template image ${sourceImage.id}: ${response.status}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      const name = `${crypto.randomUUID()}_${sourceImage.name}`;
      const relativePath = `note-images/${quizId}/${name}`;
      await this.imageService.upload({
        file: { buffer, size: buffer.length } as Express.Multer.File,
        fileName: name,
        filePath: relativePath,
      });

      const savedImage = await manager.save(NoteImage, manager.create(NoteImage, {
        name,
        relativePath,
        noteId: note.id,
        quizId,
      }));
      imageIdMap.set(sourceImage.id, savedImage.id);
    }

    note.content = remapImageIds(
      QuestionSanitizer.sanitizeQuestionContent(template.content),
      imageIdMap,
    );
    await manager.save(Note, note);
    await manager.save(QuizItem, manager.create(QuizItem, {
      quizId,
      entityType: "note",
      entityId: note.id,
      position,
    }));

    return note;
  }
}
