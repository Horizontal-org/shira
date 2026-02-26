import { Transform } from "class-transformer";
import { IsDate, IsEmail } from "class-validator";

export class InviteEmailLearnerDto {
  @IsEmail()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  spaceId: number;

  @IsDate()
  expirationDate?: Date; //TODO should we add a default expiration date?
}