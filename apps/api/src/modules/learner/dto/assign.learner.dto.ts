import { IsEmail, IsNumber } from "class-validator";

export class AssignLearnerDto {
  learners: LearnerToBeAssigned[];
}

export class LearnerToBeAssigned {
  @IsNumber()
  quizId: number;

  @IsEmail()
  email: string;
}