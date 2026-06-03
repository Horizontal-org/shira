import { Quiz } from "../domain/quiz.entity";
import { CreateTemplateQuizDto } from "./create-template.quiz.dto";

export interface ICreateTemplateQuizService {
  execute(createTemplateQuizDto: CreateTemplateQuizDto): Promise<Quiz>;
}
