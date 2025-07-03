import { IsArray, IsNumber, isObject, IsObject, IsOptional, IsString } from "class-validator";

export class ReadQuestionImageDto {
  @IsNumber()
  imageId: number;

  @IsString()
  url: string;
}
