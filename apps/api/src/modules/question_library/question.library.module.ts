import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question as QuestionEntity } from '../question/domain';
import { QuizQuestion as QuizQuestionEntity } from '../quiz/domain/quizzes_questions.entity';
import { QuestionLibraryController } from './controller/question.library.controller';
import { servicesOrganizationProviders } from './question.library.providers';
import { QuestionModule } from '../question/question.module';
import { QuizModule } from '../quiz/quiz.module';
import { Language as LanguageEntity } from '../languages/domain/languages.entity';
import { QuestionTranslation as QuestionTranslationEntity } from '../translation/domain/questionTranslation.entity';
import { ExplanationTranslation as ExplanationTranslationEntity } from '../translation/domain/explanationTranslation.entity';
import { Explanation as ExplanationEntity } from '../question/domain/explanation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionEntity,
      QuizQuestionEntity,
      LanguageEntity,
      QuestionTranslationEntity,
      ExplanationEntity,
      ExplanationTranslationEntity
    ]),
    QuestionModule,
    QuizModule
  ],
  controllers: [
    QuestionLibraryController
  ],
  providers: [
    ...servicesOrganizationProviders
  ],
})

export class QuestionLibraryModule { }
