import { IsNumber } from "class-validator";

export class DeleteQuestionQuizDto {

  @IsNumber()
  quizId: number;

  @IsNumber()
  questionId: number;

}
