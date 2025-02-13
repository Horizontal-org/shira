import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';


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
  spaces?: SpaceEntity[];


  @Expose()
  @IsString()
  readonly createdAt: string;
}
