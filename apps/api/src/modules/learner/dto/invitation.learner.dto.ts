import { IsEmail, IsString, MaxLength } from "class-validator";

export class InviteLearnerDto {
  @IsEmail()
  email!: string;

  @IsString() @MaxLength(255)
  name: string;

  assignedByUser?: number;
}