import { DeleteNoteQuizDto } from "../../dto/delete-note.quiz.dto";

export interface IDeleteNoteQuizService {
  execute(deleteDto: DeleteNoteQuizDto): Promise<void>;
}
