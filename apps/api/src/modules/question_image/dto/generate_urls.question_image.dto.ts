import { IsNumber } from "class-validator";

export class GenerateUrlsQuestionImageDto {
  @IsNumber()
  quizId: number;
}
