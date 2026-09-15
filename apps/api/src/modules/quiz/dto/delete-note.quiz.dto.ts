import { IsNumber } from "class-validator";

export class DeleteNoteQuizDto {

  @IsNumber()
  quizId: number;

  @IsNumber()
  noteId: number;

}
