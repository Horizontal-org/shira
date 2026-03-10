import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateEmailAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  currentEmail: string;

  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value?.toLowerCase().trim())
  newEmail: string;
}
