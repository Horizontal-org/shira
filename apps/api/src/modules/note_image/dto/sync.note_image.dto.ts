import { IsArray, IsNumber } from "class-validator"

export class SyncNoteImageDto {

  @IsArray()
  imageIds: string[]

  @IsNumber()
  noteId: number

  @IsNumber()
  quizId: number
}
