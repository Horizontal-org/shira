import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'
import { SpaceEntity } from 'src/modules/space/domain/space.entity'

export class PublishQuizLibraryDto {
  @IsNumber()
  quizId: number

  space: SpaceEntity

  @IsString()
  @MaxLength(255)
  spaceDisplayName: string

  @IsString()
  @MaxLength(255)
  organizationName: string

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
