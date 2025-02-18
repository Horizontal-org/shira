import { IsNumber } from 'class-validator';

export class DeleteQuizDto {

  @IsNumber()
  id: number;

  @IsNumber()
  spaceId: number;

}
