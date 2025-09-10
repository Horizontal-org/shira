import { ReadResultQuizDto } from "../../dto/read-result.quiz.dto";

export interface IGetResultQuizService {
  execute(quizId: number, spaceId: number): Promise<ReadResultQuizDto>;
}
