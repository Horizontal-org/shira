import { IsArray, IsNumber, isObject, IsObject, IsOptional } from "class-validator";

export class SyncQuestionImageDto {

  @IsArray()
  imageIds: string[];

  @IsNumber()
  questionId: number;

  @IsNumber()
  quizId: number;
}
