import { IsNumber, IsObject, IsString } from 'class-validator';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';

export class CreateQuizDto {
  @IsString()
  title: string;

  
  space?: SpaceEntity
}
