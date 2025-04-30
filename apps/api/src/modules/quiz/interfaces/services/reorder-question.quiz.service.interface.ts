import { ReorderQuestionQuizDto } from "../../dto/reorder-question.quiz.dto";

export interface IReorderQuestionQuizService {
  execute(reorderDto: ReorderQuestionQuizDto): Promise<void>;
}
