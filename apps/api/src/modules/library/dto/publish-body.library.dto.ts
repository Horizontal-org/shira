import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class PublishLibraryBodyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  spaceDisplayName: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  templateName?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  templateDescription?: string

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  langTagIds?: number[]

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[]
}
