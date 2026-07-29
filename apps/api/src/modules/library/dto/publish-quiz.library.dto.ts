import { Type } from 'class-transformer'
import { IsArray, IsNumber, IsOptional } from 'class-validator'

import { PublishAuthorDto } from './publish-question.library.dto'

export class PublishQuizLibraryDto {
  @IsNumber()
  quizId: number

  @IsNumber()
  spaceId: number

  @Type(() => PublishAuthorDto)
  author: PublishAuthorDto

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  langTagIds?: number[]

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[]
}
