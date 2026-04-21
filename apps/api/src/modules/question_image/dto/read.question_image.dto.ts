import { IsNumber, IsString } from "class-validator";

export class ReadQuestionImageDto {
  @IsNumber()
  imageId: number;

  @IsString()
  url: string;
}
