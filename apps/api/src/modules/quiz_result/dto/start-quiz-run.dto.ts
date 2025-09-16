import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StartQuizRunDto {
  @IsNotEmpty()
  quizId!: number | string;

  @IsOptional()
  @IsString()
  learnerId?: number | null;

  @IsString()
  startedAt!: string;
}
