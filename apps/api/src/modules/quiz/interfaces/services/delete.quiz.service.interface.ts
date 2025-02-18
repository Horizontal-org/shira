import { DeleteQuizDto } from "../../dto/delete.quiz.dto";

export interface IDeleteQuizService {
  execute(deleteQuizDto: DeleteQuizDto): Promise<void>;
}
