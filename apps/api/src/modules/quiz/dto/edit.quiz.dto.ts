import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditQuizDto {

  @IsNumber()
  @IsOptional()
  id: number;

  @IsNumber()
  @IsOptional()
  spaceId: number;

  @IsString()
  @IsOptional()
  title?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

}
