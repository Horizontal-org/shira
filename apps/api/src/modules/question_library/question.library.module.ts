import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question as QuestionEntity } from '../question/domain';
import { QuizQuestion as QuizQuestionEntity } from '../quiz/domain/quizzes_questions.entity';
import { QuestionLibraryController } from './controller/question.library.controller';
import { servicesOrganizationProviders } from './question.library.providers';
import { QuestionModule } from '../question/question.module';
import { QuizModule } from '../quiz/quiz.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionEntity,
      QuizQuestionEntity,
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
