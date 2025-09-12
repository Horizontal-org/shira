import { CreateQuestionQuizDto } from "../../dto/create-question.quiz.dto";

export interface ICreateQuestionQuizService {
  execute(createQuizDto: CreateQuestionQuizDto): Promise<void>;
}
