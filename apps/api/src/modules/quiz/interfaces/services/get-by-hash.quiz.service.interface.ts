import { ReadQuizDto } from "../../dto/read.quiz.dto";

export interface IGetByHashQuizService {
  execute(hash: string): Promise<ReadQuizDto>;
}
