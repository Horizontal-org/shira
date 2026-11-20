import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class StartQuizRunDto {
  @IsString()
  @IsNotEmpty()
  hash!: string;

  @IsDateString()
  startedAt!: string;
}
