import { EntityManager } from "typeorm";
import { Note } from "src/modules/note/domain";
import { CreateTemplateQuizNoteDto } from "../../dto/create-template-quiz.library.dto";

export interface CreateNoteFromTemplateParams {
  manager: EntityManager;
  quizId: number;
  position: number;
  template: CreateTemplateQuizNoteDto;
}

export interface ICreateNoteFromTemplateService {
  execute(params: CreateNoteFromTemplateParams): Promise<Note>;
}
