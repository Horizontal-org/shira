import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNumber, ValidateNested } from "class-validator";

export class UnassignLearnerDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LearnerToBeUnassigned)
  learners: LearnerToBeUnassigned[];
}

export class LearnerToBeUnassigned {
  @IsNumber()
  learnerId: number;

  @IsNumber()
  quizId: number;

  @IsEmail()
  email: string;
}
