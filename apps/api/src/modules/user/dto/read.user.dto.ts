import { Exclude, Expose, Transform } from 'class-transformer';
import { IsNumber, IsString, IsBoolean, IsOptional } from 'class-validator';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';

@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  id: string;

  @Expose()
  @IsString()
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @Expose()
  @IsBoolean()
  isSuperAdmin: boolean;

  @Expose()
  spaces?: SpaceEntity[];

  @Expose()
  @IsString()
  readonly createdAt: string;

  @Expose()
  @IsString()
  readonly lastPasswordChangeAt: string;
}
