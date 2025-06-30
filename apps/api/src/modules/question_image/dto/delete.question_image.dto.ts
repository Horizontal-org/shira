import { IsNumber } from "class-validator";

export class DeleteQuestionImageDto {
  @IsNumber()
  questionImageId: number
}
