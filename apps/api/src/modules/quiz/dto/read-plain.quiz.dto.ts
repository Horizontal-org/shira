import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

@Exclude()
export class ReadPlainQuizDto {
  @Expose()
  @IsNumber()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  hash: string;

  @Expose()
  @IsBoolean()
  published: boolean;

  @Expose()
  @IsString()
  readonly updatedAt: string;

  @Expose()
  @IsString()
  @IsOptional()
  latestGlobalUpdate: string
}
