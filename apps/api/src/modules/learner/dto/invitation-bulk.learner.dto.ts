import { Type } from "class-transformer";
import { IsArray, ValidateNested, IsNumber, IsEmail, IsString } from "class-validator";

export class InvitationBulkLearnerDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LearnerToBeInvited)
  learners: LearnerToBeInvited[];
}

export class LearnerToBeInvited {
  @IsString()
  name: string;

  @IsNumber()
  quizId: number;

  @IsEmail()
  email: string;
}