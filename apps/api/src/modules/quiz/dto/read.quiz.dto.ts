import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import { QuizQuestion } from '../domain/quizzes_questions.entity';
import { ReadQuestionImageDto } from 'src/modules/question_image/dto/read.question_image.dto';


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
  visibility: string;

  @Expose()
  @IsString()
  readonly updatedAt: string;

  @Expose()
  @IsArray()
  quizQuestions: QuizQuestion[]

  @Expose()
  @IsArray()
  @IsOptional()
  images?: ReadQuestionImageDto
}
