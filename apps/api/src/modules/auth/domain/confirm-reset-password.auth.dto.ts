import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmResetPasswordAuthDto {
  @IsString()
  @IsNotEmpty()
  newPassword: string;

  @IsString()
  @IsNotEmpty()
  confirmNewPassword: string;
}
