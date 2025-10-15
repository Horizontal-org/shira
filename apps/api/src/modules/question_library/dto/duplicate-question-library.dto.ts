import { IsNumber, IsString } from "class-validator";

export class DuplicateQuestionLibraryDto {
  @IsNumber()
  quizId: number;

  @IsNumber()
  languageId: number;

  @IsNumber()
  appId: number;
}