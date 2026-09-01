import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsString,
  ValidateNested,
} from 'class-validator'
import { IsNotEmpty } from 'src/utils/decorators/is-not-empty.decorator'

export class QuestionImportExplanationDto {
  @IsString()
  position: string

  @IsString()
  index: string

  @IsString()
  text: string
}

export class QuestionImportMetadataDto {
  @IsString()
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string

  @IsString()
  @IsNotEmpty({ message: 'App cannot be empty' })
  app: string

  @IsBoolean()
  isPhishing: boolean

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionImportExplanationDto)
  explanations: QuestionImportExplanationDto[]
}
