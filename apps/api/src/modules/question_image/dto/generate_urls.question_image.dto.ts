import { IsArray, IsNumber, isObject, IsObject, IsOptional } from "class-validator";

export class GenerateUrlsQuestionImageDto {
  @IsNumber()
  quizId: number;
}
