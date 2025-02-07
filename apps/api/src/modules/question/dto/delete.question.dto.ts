import { IsNumberString } from 'class-validator';

export class DeleteQuestionDto {
  @IsNumberString()
  id: number;
}
