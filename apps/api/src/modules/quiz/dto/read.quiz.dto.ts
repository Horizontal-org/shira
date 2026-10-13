import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import { HydratedQuizItem } from '../interfaces/services/quiz-items.service.interface';
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
  @IsBoolean()
  assessmentMode: boolean;

  @Expose()
  @IsString()
  visibility: string;

  @Expose()
  @IsString()
  readonly updatedAt: string;

  @Expose()
  @IsArray()
  quizQuestions: HydratedQuizItem[]

  @Expose()
  @IsArray()
  @IsOptional()
  images?: ReadQuestionImageDto
}
