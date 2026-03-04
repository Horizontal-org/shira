import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordAuthDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({ value }) => value?.trim())
  newPassword: string;
}
