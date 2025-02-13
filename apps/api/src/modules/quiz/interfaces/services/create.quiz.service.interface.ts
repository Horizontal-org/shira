import { CreateQuizDto } from "../../dto/create.quiz.dto";

export interface ICreateQuizService {
  execute(createQuizDto: CreateQuizDto): Promise<void>;
}
