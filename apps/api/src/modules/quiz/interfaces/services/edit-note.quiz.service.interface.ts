import { EditNoteQuizDto } from "../../dto/edit-note.quiz.dto";

export interface IEditNoteQuizService {
  execute(editNoteDto: EditNoteQuizDto): Promise<void>;
}
