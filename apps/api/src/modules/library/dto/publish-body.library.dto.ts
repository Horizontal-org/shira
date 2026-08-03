import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class PublishLibraryBodyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  spaceDisplayName: string

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
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
