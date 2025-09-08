import { IsArray, IsNumber, IsObject, IsOptional } from "class-validator";

export class AddResultQuizDto {

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
