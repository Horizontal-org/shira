import { IsBoolean, IsString, Length } from 'class-validator';
import { Easyness } from '../domain/easyness.survey.enum';
import { Recommend } from '../domain/recommend.survey.enum';

export class CreateSurveyDto {
  @IsString()
  easyness?: Easyness;

  @IsString()
  recommend?: Recommend;

  @IsString()
  improvements?: string;
}
