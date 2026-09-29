import { IsNumber } from "class-validator";

export class DeleteNoteDto {

  @IsNumber()
  quizId: number;

  @IsNumber()
  noteId: number;

}
