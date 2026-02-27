import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class StartQuizRunDto {
  @IsNotEmpty()
  quizId!: number | string;

  @IsOptional()
  @IsNumber()
  learnerId?: number | null;

  @IsDateString()
  startedAt!: string;
}
