import { IsArray, IsNumber } from "class-validator";

export class ReorderQuestionQuizDto {

  @IsNumber()
  quizId: number;

  @IsArray()
  newOrder: {
    position: number;
    questionId: number
  }[];

}
