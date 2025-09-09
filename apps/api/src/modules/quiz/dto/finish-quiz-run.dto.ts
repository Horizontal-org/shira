import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsNumber } from 'class-validator';

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

  answeredAt!: string;
}

export class FinishQuizRunDto {
  finishedAt!: string;

  @IsArray()
  @Type(() => QuestionRunDraftDto)
  questionRuns!: QuestionRunDraftDto[];
}
