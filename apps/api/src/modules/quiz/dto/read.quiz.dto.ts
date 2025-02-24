import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';


@Exclude()
export class ReadQuizDto {
  @Expose()
  @IsNumber()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsBoolean()
  published: boolean;

  @Expose()
  @IsString()
  readonly updatedAt: string;
}
