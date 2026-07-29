import { Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class PublishAuthorDto {
  @IsString()
  @MaxLength(31)
  publicSpaceId: string

  @IsString()
  @MaxLength(255)
  spaceName: string

  @IsString()
  @MaxLength(255)
  spaceDisplayName: string

  @IsString()
  @MaxLength(255)
  organizationName: string
}

export class PublishQuestionLibraryDto {
  @IsNumber()
  questionId: number

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
