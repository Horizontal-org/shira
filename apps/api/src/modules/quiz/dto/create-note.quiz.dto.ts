import { IsNumber, IsString } from "class-validator";

export class CreateNoteQuizDto {

  @IsNumber()
  quizId: number;

  @IsString()
  name: string;

  @IsString()
  content: string;

}
