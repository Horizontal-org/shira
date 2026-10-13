import { IsNumber, IsString } from "class-validator"

export class ReadNoteImageDto {
  @IsNumber()
  imageId: number

  @IsString()
  url: string
}
