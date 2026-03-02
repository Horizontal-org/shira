import { Transform } from "class-transformer";
import { IsEmail, IsString, MaxLength } from "class-validator";

export class InviteLearnerDto {
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email!: string;

  @IsString() @MaxLength(255)
  name: string;

  assignedByUser?: number;
}