import { IsNumber, IsString } from "class-validator";
import { IsNotEmpty } from "src/utils/decorators/is-not-empty.decorator";

export class DuplicateQuizDto {
  @IsNumber()
  quizId: number;

  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;
}