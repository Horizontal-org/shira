import { CreateTemplateQuestionDto } from "../../dto/create-template-question.library.dto";

export interface ICreateTemplateQuestionService {
  execute(createTemplateQuestionDto: CreateTemplateQuestionDto): Promise<number>;
}
