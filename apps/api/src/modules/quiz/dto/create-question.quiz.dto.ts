import { IsArray, IsNumber, isObject, IsObject, IsOptional } from "class-validator";

export class CreateQuestionQuizDto {

  @IsNumber()
  quizId: number;

  @IsObject()
  question: {
    name: string;
    content: string;
    isPhishing: boolean;
    app: number;
  };

  @IsArray()
  @IsOptional()
  explanations?: {
    position: string;
    index: string;
    text: string;
  }[];
}
