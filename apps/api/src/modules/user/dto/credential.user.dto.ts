import { IsString } from 'class-validator';

export class CredentialUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
