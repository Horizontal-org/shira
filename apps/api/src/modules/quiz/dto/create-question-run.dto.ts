import { IsDateString, IsEnum, IsNumber } from 'class-validator';
import { Answer } from '../domain/question_runs.entity';

export class CreateQuestionRunDto {
  @IsNumber()
  questionId!: number;

  @IsEnum(Answer)
  answer!: Answer;

  @IsDateString()
  answeredAt!: string;
}

