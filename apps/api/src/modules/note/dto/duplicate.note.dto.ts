import { IsNumber } from "class-validator"

export class DuplicateNoteDto {

  @IsNumber()
  quizId: number

  @IsNumber()
  noteId: number

}
