import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { surveyControllers } from './controllers';
import { Survey as SurveyEntity } from './domain/survey.entity';
import { CreateSurveyService } from './services/create.survey.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    SurveyEntity, 
  ])],
  controllers: [...surveyControllers],
  providers: [CreateSurveyService]
})
export class SurveyModule {}
