import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import { QuizQuestion } from '../domain/quizzes_questions.entity';


@Exclude()
export class ReadQuizDto {
  @Expose()
  @IsNumber()
  id: string;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  hash: string;

  @Expose()
  @IsBoolean()
  published: boolean;

  @Expose()
  @IsString()
  readonly updatedAt: string;

  @Expose()
  @IsArray()
  quizQuestions: QuizQuestion[]
}
