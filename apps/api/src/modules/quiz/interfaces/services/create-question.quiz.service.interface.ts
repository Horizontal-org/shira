import { CreateQuestionQuizDto } from "../../../quiz_result/dto/create-question.quiz.dto";

export interface ICreateQuestionQuizService {
  execute(createQuizDto: CreateQuestionQuizDto): Promise<void>;
}
