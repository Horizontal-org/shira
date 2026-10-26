import { Inject, Injectable } from "@nestjs/common";
import { TYPES as TYPES_IMAGE } from "src/modules/image/interfaces";
import { ITransferTemplateImagesService } from "src/modules/image/interfaces/services/transfer-template-images.service.interface";
import { remapImageIds } from "src/modules/image/utils/remap-image-ids.util";
import { Note } from "src/modules/note/domain";
import { QuizItem } from "src/modules/quiz/domain/quiz_items.entity";
import { QuestionSanitizer } from "src/utils/question-sanitizer.util";
import {
  CreateNoteFromTemplateParams,
  ICreateNoteFromTemplateService,
} from "../interfaces/services/create-note-from-template.library.service.interface";

@Injectable()
export class CreateNoteFromTemplateService implements ICreateNoteFromTemplateService {
  constructor(
    @Inject(TYPES_IMAGE.services.ITransferTemplateImagesService)
    private readonly transferTemplateImagesService: ITransferTemplateImagesService,
  ) { }

  async execute({ manager, quizId, position, template }: CreateNoteFromTemplateParams): Promise<Note> {
    const note = await manager.save(Note, manager.create(Note, {
      name: template.name,
      content: "",
    }));

    const imageIdMap = await this.transferTemplateImagesService.transferNoteImages(
      manager,
      quizId,
      note,
      template.images ?? [],
      [template.content],
    );

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
