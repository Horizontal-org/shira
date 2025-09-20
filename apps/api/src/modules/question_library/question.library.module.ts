import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App as AppEntity } from '../app/domain';
import { FieldOfWork as FieldOfWorkEntity } from '../field_of_work/domain';
import { Explanation as ExplanationEntity } from '../question/domain';
import { libraryQuestionControllers } from './controller';
import { QuestionTranslation } from '../translation/domain/questionTranslation.entity';
import { ExplanationTranslation as ExplanationTranslationEntity } from '../translation/domain/explanationTranslation.entity';
import { Language as LanguageEntity } from '../languages/domain';
import { Question as QuestionEntity } from '../question/domain';

import { GetLibraryQuestionService } from './services/library.question.service';
import { QuestionImage } from '../question_image/domain';
import { QuestionImageModule } from '../question_image/question_image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionEntity,
      QuestionImage,
      AppEntity,
      FieldOfWorkEntity,
      ExplanationEntity,
      QuestionTranslation,
      ExplanationTranslationEntity,
      LanguageEntity,
    ]),
    QuestionImageModule
  ],
  controllers: [...libraryQuestionControllers],
  providers: [
    GetLibraryQuestionService,
  ],
})
export class QuestionLibraryModule {}
