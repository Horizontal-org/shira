import { Type } from 'class-transformer'
import { ArrayMaxSize, ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator'
import { QUIZ_IMPORT_MAX_QUESTIONS } from 'src/utils/environment/import-limits.environment'

export class QuizImportQuestionMetadataDto {
  @IsInt()
  id: number

  @IsString()
  @IsNotEmpty({ message: 'Question name cannot be empty' })
  @MaxLength(255)
  name: string

  @IsInt()
  position: number
}

export class QuizImportMetadataDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  @MaxLength(255)
  title: string

  @IsArray()
  @ArrayNotEmpty({ message: 'questions cannot be empty' })
  @ArrayMaxSize(QUIZ_IMPORT_MAX_QUESTIONS, { message: `questions cannot contain more than ${QUIZ_IMPORT_MAX_QUESTIONS} items` })
  @ValidateNested({ each: true })
  @Type(() => QuizImportQuestionMetadataDto)
  questions: QuizImportQuestionMetadataDto[]
}
