import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import {
  CreateTemplateQuizExplanationDto,
  CreateTemplateQuizImageDto,
} from "./create-template-quiz.library.dto";

export class CreateTemplateQuestionDto {
  @IsInt()
  quizId: number;

  @IsString()
  questionName: string;

  @IsString()
  content: string;

  @IsBoolean()
  isPhishing: boolean;

  @IsInt()
  appId: number;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTemplateQuizExplanationDto)
  explanations?: CreateTemplateQuizExplanationDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTemplateQuizImageDto)
  images?: CreateTemplateQuizImageDto[];
}
