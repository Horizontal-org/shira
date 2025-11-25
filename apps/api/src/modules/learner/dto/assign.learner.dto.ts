import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNumber, ValidateNested } from "class-validator";

export class AssignLearnerDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LearnerToBeAssigned)
  learners: LearnerToBeAssigned[];
}

export class LearnerToBeAssigned {
  @IsNumber()
  quizId: number;

  @IsEmail()
  email: string;
}