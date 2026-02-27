import { IsNumber } from 'class-validator';

export class DeleteQuestionDto {
  @IsNumber()
  id: number;
}
