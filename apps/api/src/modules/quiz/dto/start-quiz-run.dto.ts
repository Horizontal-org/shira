import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StartQuizRunDto {
  @IsNotEmpty()
  quizId!: number | string;

  @IsOptional()
  @IsString()
  learnerId?: string | null;

  @IsISO8601()
  startedAt!: string;
}
