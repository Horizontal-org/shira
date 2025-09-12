import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Answer } from '../../quiz/domain/question_runs.entity';

export class CreateQuestionRunDto {
  @IsNumber()
  questionId: number;

  @IsEnum(Answer)
  answer: Answer;

  @IsNotEmpty()
  answerTime: Date;
}
