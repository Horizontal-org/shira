import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { SpaceEntity } from "src/modules/space/domain/space.entity";
import { IsNotEmpty } from "src/utils/decorators/is-not-empty.decorator";
import { QuizVisibility } from "../dto/quiz-visibility-enum.quiz";

class CreateTemplateQuizExplanationDto {
  @IsString()
  position: string;

  @IsString()
  index: string;

  @IsString()
  text: string;
}

export class CreateTemplateQuizQuestionDto {
  @IsString()
  questionName: string;

  @IsString()
  content: string;

  @IsBoolean()
  isPhishing: boolean;

  @IsString()
  appName: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTemplateQuizExplanationDto)
  explanations?: CreateTemplateQuizExplanationDto[];
}

export class CreateTemplateQuizDto {
  @IsString()
  @IsNotEmpty({ message: "Title cannot be empty" })
  title: string;

  @IsEnum(QuizVisibility)
  @IsNotEmpty({ message: "Visibility cannot be empty" })
  visibility: QuizVisibility;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTemplateQuizQuestionDto)
  questions: CreateTemplateQuizQuestionDto[];

  space?: SpaceEntity;
}
