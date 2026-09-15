import { IsNumber, IsString } from "class-validator";

export class EditNoteQuizDto {

  @IsNumber()
  noteId: number;

  @IsNumber()
  quizId: number;

  @IsString()
  name: string;

  @IsString()
  content: string;

}
