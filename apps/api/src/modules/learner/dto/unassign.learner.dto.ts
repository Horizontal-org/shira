import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";

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
}
