import { CreateNoteQuizDto } from "../../dto/create-note.quiz.dto";

export interface ICreateNoteQuizService {
  execute(createNoteDto: CreateNoteQuizDto): Promise<void>;
}
