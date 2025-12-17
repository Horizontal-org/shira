import { IsEnum, IsString } from 'class-validator';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import { IsNotEmpty } from 'src/utils/decorators/is-not-empty.decorator';
import { QuizVisibility } from './quiz-visibility-enum.quiz';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @IsEnum(QuizVisibility)
  @IsNotEmpty({ message: 'Visibility cannot be empty' })
  visibility: QuizVisibility;

  space?: SpaceEntity;
}
