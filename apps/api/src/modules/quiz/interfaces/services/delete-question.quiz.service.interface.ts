import { DeleteQuestionQuizDto } from "../../dto/delete-question.quiz.dto";

export interface IDeleteQuestionQuizService {
  execute(deleteDto: DeleteQuestionQuizDto): Promise<void>;
}
