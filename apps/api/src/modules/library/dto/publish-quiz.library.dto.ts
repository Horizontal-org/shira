import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

import { PublishAuthorDto } from './publish-question.library.dto'

export class PublishQuizLibraryDto {
  @IsNumber()
  quizId: number

  @IsNumber()
  spaceId: number

  @Type(() => PublishAuthorDto)
  author: PublishAuthorDto

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  templateName: string

  @IsString()
  templateDescription: string

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  langTagIds?: number[]

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[]
}
