import { IsArray, IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator'

export class PublishQuestionLibraryBodyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  spaceDisplayName: string

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  langTagIds?: number[]

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[]
}
