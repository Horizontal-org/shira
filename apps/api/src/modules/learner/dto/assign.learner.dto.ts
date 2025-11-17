import { IsEmail, IsNumber } from "class-validator";

export class AssignLearnerDto {
  @IsNumber()
  quizId: number;

  @IsEmail()
  email: string;
}