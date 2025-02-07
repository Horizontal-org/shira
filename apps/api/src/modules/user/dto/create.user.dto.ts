import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(6, 60)
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}
