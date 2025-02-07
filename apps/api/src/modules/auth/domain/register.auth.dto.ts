import { IsString, IsStrongPassword } from 'class-validator';

export class RegisterAuthDto {

  @IsString()
  email: string;

  @IsString()
  passphrase: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  spaceName: string;
}
