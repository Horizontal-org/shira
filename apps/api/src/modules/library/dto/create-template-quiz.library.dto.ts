import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { SpaceEntity } from "src/modules/space/domain/space.entity";
import { IsNotEmpty } from "src/utils/decorators/is-not-empty.decorator";
import { QuizVisibility } from "src/modules/quiz/dto/quiz-visibility-enum.quiz";

export class CreateTemplateQuizExplanationDto {
  @IsString()
  position: string;

  @IsString()
  index: string;

  @IsString()
  text: string;
}

export class CreateTemplateQuizImageDto {
  @IsInt()
  id: number;

  @IsString()
  name: string;

  @IsString()
  url: string;
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

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateTemplateQuizImageDto)
  images?: CreateTemplateQuizImageDto[];
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
