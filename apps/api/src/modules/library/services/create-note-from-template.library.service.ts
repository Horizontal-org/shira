import { Injectable } from "@nestjs/common";
import { Note } from "src/modules/note/domain";
import { CreateNoteWithImagesService } from "src/modules/note/services/create-note-with-images.note.service";
import {
  CreateNoteFromTemplateParams,
  ICreateNoteFromTemplateService,
} from "../interfaces/services/create-note-from-template.library.service.interface";

@Injectable()
export class CreateNoteFromTemplateService implements ICreateNoteFromTemplateService {
  constructor(
    private readonly createNoteWithImagesService: CreateNoteWithImagesService,
  ) { }

  async execute({ manager, quizId, position, template }: CreateNoteFromTemplateParams): Promise<Note> {
    return this.createNoteWithImagesService.execute({
      manager,
      quizId,
      position,
      name: template.name,
      content: template.content,
      images: template.images ?? [],
    });
  }
}
