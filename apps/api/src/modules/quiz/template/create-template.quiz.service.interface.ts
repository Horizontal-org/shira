import { CreateTemplateQuizDto } from "./create-template.quiz.dto";

export interface ICreateTemplateQuizService {
  execute(createTemplateQuizDto: CreateTemplateQuizDto);
}
