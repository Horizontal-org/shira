import { IsEmail, IsNumber } from "class-validator";

export class UnassignLearnerDto {
  learners: LearnerToBeUnassigned[];
}

export class LearnerToBeUnassigned {
  @IsNumber()
  quizId: number;

  @IsEmail()
  email: string;
}
