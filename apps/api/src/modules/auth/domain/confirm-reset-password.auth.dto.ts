import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmResetPasswordAuthDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
