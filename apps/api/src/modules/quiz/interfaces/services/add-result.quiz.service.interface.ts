import { AddResultQuizDto } from "../../dto/add-result.quiz.dto";

export interface IAddResultQuizService {
  execute(addResultQuizDto: AddResultQuizDto): Promise<void>;
}
