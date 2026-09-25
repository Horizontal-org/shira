import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { QuizVisibility } from './quiz-visibility-enum.quiz'

export class ImportQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsEnum(QuizVisibility)
  visibility: QuizVisibility
}
