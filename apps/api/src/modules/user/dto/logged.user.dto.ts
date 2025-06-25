import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsString, IsBoolean } from 'class-validator';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import { Role } from '../domain/role.enum';

@Exclude()
export class LoggedUserDto {
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
  activeOrganization?: {
    id: number;
    name: string;
    role: Role;
  };

  @Expose()
  activeSpace?: {
    space: SpaceEntity
    role: Role;
  };

}
