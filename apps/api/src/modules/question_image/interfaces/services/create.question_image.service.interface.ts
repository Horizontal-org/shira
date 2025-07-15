import { CreateQuestionImageDto } from "../../dto/create.question_image.dto";

export interface CreateQuestionImageServiceResponse {
  url: string;
  imageId: number
}

export interface ICreateQuestionImageService {
  execute(createQuestionImageDto: CreateQuestionImageDto): Promise<CreateQuestionImageServiceResponse>;
}
