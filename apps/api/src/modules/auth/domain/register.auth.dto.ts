import { IsString, IsStrongPassword } from 'class-validator';

export class RegisterAuthDto {

  @IsString()
  email: string;

  @IsString()
  passphrase: string;

  @IsString()
  password: string;

  @IsString()
  spaceName: string;
}
