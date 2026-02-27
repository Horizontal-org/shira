import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsEnum, IsNumber } from 'class-validator';

export enum Answer {
  Legitimate = 'is_legitimate',
  Phishing = 'is_phishing',
  Unknown = 'dont_know',
}

export class QuestionRunDto {
  @IsNumber()
  questionId!: number;

  @IsEnum(Answer)
  answer!: Answer;

  @IsDateString()
  answeredAt!: string;
}

export class FinishQuizRunDto {
  @IsDateString()
  finishedAt!: string;

  @IsArray()
  @Type(() => QuestionRunDto)
  questionRuns!: QuestionRunDto[];
}
