import { ReadPlainQuizDto } from "../../dto/read-plain.quiz.dto";

export interface IListQuizService {
  execute(spaceId: number): Promise<ReadPlainQuizDto[]>;
}
