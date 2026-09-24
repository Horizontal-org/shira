import { IsNumber, IsString, MaxLength } from "class-validator"
import { IsNotEmpty } from "src/utils/decorators/is-not-empty.decorator"

export class CreateNoteDto {

  @IsNumber()
  quizId: number

  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MaxLength(100)
  name: string

  @IsString()
  @IsNotEmpty({ message: 'Content cannot be empty' })
  content: string

}
