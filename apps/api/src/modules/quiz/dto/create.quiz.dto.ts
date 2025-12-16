import { IsEnum, IsString } from 'class-validator';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import { IsNotEmpty } from 'src/utils/decorators/is-not-empty.decorator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsEnum(['public', 'private'])
  @IsNotEmpty({ message: 'Visibility cannot be empty' })
  visibility: 'public' | 'private';

  space?: SpaceEntity;
}
