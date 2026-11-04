import { Type } from 'class-transformer'
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator'
import { IsNotEmpty } from 'src/utils/decorators/is-not-empty.decorator'
import { QUESTION_IMPORT_MAX_EXPLANATIONS } from 'src/utils/environment/import-limits.environment'

export class QuestionImportExplanationDto {
  @IsString()
  @MaxLength(150)
  position: string

  @IsString()
  @MaxLength(150)
  index: string

  @IsString()
  @MaxLength(150)
  text: string
}

export class QuestionImportMetadataDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @MaxLength(255)
  name: string

  @IsString()
  @IsNotEmpty({ message: 'App cannot be empty' })
  @MaxLength(255)
  app: string

  @IsBoolean()
  isPhishing: boolean

  @IsArray()
  @ArrayMaxSize(QUESTION_IMPORT_MAX_EXPLANATIONS, { message: `explanations cannot contain more than ${QUESTION_IMPORT_MAX_EXPLANATIONS} items` })
  @ValidateNested({ each: true })
  @Type(() => QuestionImportExplanationDto)
  explanations: QuestionImportExplanationDto[]
}
