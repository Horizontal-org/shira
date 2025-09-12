import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { servicesQuizProviders } from './quiz-result.providers';
import { GetResultQuizController } from './controller/get-result.quiz.controller';
import { QuestionRun as QuestionRunEntity } from './domain/question_runs.entity';
import { QuizRun as QuizRunEntity } from './domain/quiz_runs.entity';
import { Quiz as QuizEntity } from '../quiz/domain/quiz.entity';
import { QuizQuestion as QuizQuestionEntity } from '../quiz/domain/quizzes_questions.entity';
import { QuizModule } from '../quiz/quiz.module';
import { QuizRunController } from './controller/quiz-run.controller';
import { QuestionRunController } from './controller/question-run.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuizEntity,
      QuizQuestionEntity,
      QuizRunEntity,
      QuestionRunEntity,
    ]),
    QuizModule,
  ],
  controllers: [
    GetResultQuizController,
    QuizRunController,
    QuestionRunController
  ],
  providers: [
    ...servicesQuizProviders
  ],
})
export class QuizResultModule {}
