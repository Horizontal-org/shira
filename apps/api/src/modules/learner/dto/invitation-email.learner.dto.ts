import { IsDate, IsEmail } from "class-validator";

export class InviteEmailLearnerDto {
  @IsEmail()
  email: string;

  spaceId: number;

  @IsDate()
  expirationDate?: Date; //TODO should we add a default expiration date?
}