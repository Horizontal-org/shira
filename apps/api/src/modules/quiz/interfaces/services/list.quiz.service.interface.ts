import { ReadQuizDto } from "../../dto/read.quiz.dto";

export interface IListQuizService {
  execute(spaceId: number): Promise<ReadQuizDto>;
}
