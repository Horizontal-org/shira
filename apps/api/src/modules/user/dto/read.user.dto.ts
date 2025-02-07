import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsString, IsUUID } from 'class-validator';


@Exclude()
export class ReadUserDto {
  @Expose()
  @IsUUID('4')
  id: string;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  role: string;

  @Expose()
  @IsString()
  readonly createdAt: string;
}
