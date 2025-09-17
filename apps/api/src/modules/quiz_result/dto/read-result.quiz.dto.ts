import { IsObject } from "class-validator";

export class ReadResultQuizDto {
  @IsObject()
  quiz: {
    id: number;
    title: string;
    totalQuestions: number;
  };

  @IsObject()
  metrics: {
    completedCount: number;
    averageScore: number;
  };
}
