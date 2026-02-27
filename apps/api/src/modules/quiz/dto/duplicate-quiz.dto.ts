import { IsEnum, IsNumber, IsString } from "class-validator";
import { IsNotEmpty } from "src/utils/decorators/is-not-empty.decorator";
import { QuizVisibility } from "./quiz-visibility-enum.quiz";

export class DuplicateQuizDto {
  @IsNumber()
  quizId: number;

  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsEnum(QuizVisibility)
  @IsNotEmpty({ message: 'Visibility cannot be empty' })
  visibility: QuizVisibility;
}