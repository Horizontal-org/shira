import { EditQuizDto } from "../../dto/edit.quiz.dto";

export interface IEditQuizService {
  execute(editQuizDto: EditQuizDto): Promise<void>;
}
