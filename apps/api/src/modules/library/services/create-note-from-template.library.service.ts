import { Inject, Injectable } from "@nestjs/common";
import { Note } from "src/modules/note/domain";
import { TYPES as TYPES_NOTE } from "src/modules/note/interfaces";
import { ICreateNoteWithImagesService } from "src/modules/note/interfaces/services/create-note-with-images.note.service.interface";
import {
  CreateNoteFromTemplateParams,
  ICreateNoteFromTemplateService,
} from "../interfaces/services/create-note-from-template.library.service.interface";

@Injectable()
export class CreateNoteFromTemplateService implements ICreateNoteFromTemplateService {
  constructor(
    @Inject(TYPES_NOTE.services.ICreateNoteWithImagesService)
    private readonly createNoteWithImagesService: ICreateNoteWithImagesService,
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
