import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';


@Exclude()
export class LoggedUserDto {
  @Expose()
  @IsNumber()
  id: string;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  role: string;

  @Expose()  
  space?: SpaceEntity;

}
