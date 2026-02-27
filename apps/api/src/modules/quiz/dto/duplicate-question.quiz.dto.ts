import { IsNumber } from "class-validator";

export class DuplicateQuestionQuizDto {
  @IsNumber()
  quizId: number;

  @IsNumber() 
  questionId: number;
}