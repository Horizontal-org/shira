import { IsNumber, IsString, MinLength } from "class-validator";

export class DuplicateQuizDto {
  @IsNumber()
  quizId: number;

  @IsString()
  title: string;
}