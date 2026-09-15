import { IsNumber, IsString } from "class-validator";

export class CreateNoteDto {

  @IsNumber()
  quizId: number;

  @IsString()
  name: string;

  @IsString()
  content: string;

}
