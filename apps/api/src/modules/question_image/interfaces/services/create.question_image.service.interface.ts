import { CreateQuestionImageDto } from "../../dto/create.question_image.dto";

export interface ICreateQuestionImageService {
  execute(createQuestionImageDto: CreateQuestionImageDto): Promise<void>;
}
