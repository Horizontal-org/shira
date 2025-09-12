import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Answer } from '../../quiz_result/domain/question_runs.entity';

export class CreateQuestionRunDto {
  @IsNumber()
  questionId: number;

  @IsEnum(Answer)
  answer: Answer;

  @IsDateString()
  answeredAt: string;
}
