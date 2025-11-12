import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class InviteLearnerDto {
  @IsEmail()
  email!: string;

  @IsString() @IsNotEmpty() @MaxLength(255)
  name!: string;

  @IsNotEmpty()
  spaceId!: number;

  assignedByUser?: number;
}