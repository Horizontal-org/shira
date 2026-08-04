import { CreateTemplateQuizDto } from "../../dto/create-template-quiz.library.dto";

export interface ICreateTemplateQuizService {
  execute(createTemplateQuizDto: CreateTemplateQuizDto): Promise<number>;
}
