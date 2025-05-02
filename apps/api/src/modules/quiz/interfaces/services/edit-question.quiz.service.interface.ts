import { EditQuestionQuizDto } from "../../dto/edit-question.quiz.dto";

export interface IEditQuestionQuizService {
  execute(editQuizDto: EditQuestionQuizDto): Promise<void>;
}
