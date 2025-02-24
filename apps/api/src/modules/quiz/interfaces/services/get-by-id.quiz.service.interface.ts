import { ReadQuizDto } from "../../dto/read.quiz.dto";

export interface IGetByIdQuizService {
  execute(id: number, spaceId: number): Promise<ReadQuizDto>;
}
