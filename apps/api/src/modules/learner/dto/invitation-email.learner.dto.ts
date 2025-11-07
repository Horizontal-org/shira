import { IsEmail } from "class-validator";

export class InviteEmailLearnerDto {
  @IsEmail()
  email: string;
  spaceId: number;
}