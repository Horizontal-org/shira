import { Type } from "class-transformer";
import { IsArray, ValidateNested, IsNumber, IsEmail } from "class-validator";

export class InvitationBulkLearnerDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LearnerToBeInvited)
  learners: LearnerToBeInvited[];
}

export class LearnerToBeInvited {
  @IsNumber()
  quizId: number;

  @IsEmail()
  email: string;
}