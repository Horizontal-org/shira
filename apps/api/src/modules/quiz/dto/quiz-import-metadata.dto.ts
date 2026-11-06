import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator'

export class QuizImportQuestionMetadataDto {
  @IsInt()
  id: number

  @IsString()
  @IsNotEmpty({ message: 'Question name cannot be empty' })
  name: string

  @IsInt()
  position: number
}

export class QuizImportNoteMetadataDto {
  @IsInt()
  id: number

  @IsString()
  @IsNotEmpty({ message: 'Note name cannot be empty' })
  name: string

  @IsInt()
  position: number
}

export class QuizImportMetadataDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string

  @IsArray()
  @ArrayNotEmpty({ message: 'questions cannot be empty' })
  @ValidateNested({ each: true })
  @Type(() => QuizImportQuestionMetadataDto)
  questions: QuizImportQuestionMetadataDto[]

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => QuizImportNoteMetadataDto)
  notes: QuizImportNoteMetadataDto[] = []
}
