import { IsNumber, IsString, MinLength } from "class-validator";

export class DuplicateQuizDto {
  @IsNumber()
  quizId: number;

  @IsString()
  @MinLength(1, { message: 'Quiz title cannot be empty' })
  title: string;
}