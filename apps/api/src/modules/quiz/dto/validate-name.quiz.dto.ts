import { IsString } from 'class-validator';
import { IsNotEmpty } from 'src/utils/decorators/is-not-empty.decorator';

export class ValidateQuizNameQuizDto {
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;
}
