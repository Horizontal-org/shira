import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";

export class AssignLearnerDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LearnerToBeAssigned)
  learners: LearnerToBeAssigned[];
}

export class LearnerToBeAssigned {
  @IsNumber()
  learnerId: number;

  @IsNumber()
  quizId: number;
}