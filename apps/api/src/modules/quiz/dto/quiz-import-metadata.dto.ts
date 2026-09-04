import { IsNotEmpty, IsString } from 'class-validator'

export class QuizImportMetadataDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string
}
