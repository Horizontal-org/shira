import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @Expose()
  @IsString()
  visibility: string;

  @Expose()
  @IsNumber()
  questionsCount: number;
}
