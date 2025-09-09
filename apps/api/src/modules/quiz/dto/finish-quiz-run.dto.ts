import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';

export enum Answer {
  Legitimate = 'is_legitimate',
  Phishing = 'is_phishing',
  Unknown = 'dont_know',
}

export class QuestionRunDraftDto {
  @IsNumber()
  questionId!: number;

  @IsEnum(Answer)
  answer!: Answer;

  @IsISO8601()
  answeredAt!: string;
}

export class FinishQuizRunDto {
  @IsISO8601()
  finishedAt!: string;

  @IsArray()
  @Type(() => QuestionRunDraftDto)
  questionRuns!: QuestionRunDraftDto[];
}
