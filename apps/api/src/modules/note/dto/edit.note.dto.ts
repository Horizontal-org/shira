import { IsNumber, IsString } from "class-validator";

export class EditNoteDto {

  @IsNumber()
  noteId: number;

  @IsNumber()
  quizId: number;

  @IsString()
  name: string;

  @IsString()
  content: string;

}
