import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsBoolean } from 'class-validator';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';


@Exclude()
export class ReadUserDto {
  @Expose()
  @IsNumber()
  id: string;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsBoolean()
  isSuperAdmin: boolean;

  @Expose()  
  spaces?: SpaceEntity[];

  @Expose()
  @IsString()
  readonly createdAt: string;
}
