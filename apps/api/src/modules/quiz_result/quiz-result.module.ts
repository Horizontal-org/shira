import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { servicesQuizProviders } from './quiz-result.providers';
import { GetResultQuizController } from './controller/get-result.quiz.controller';
import { QuestionRun as QuestionRunEntity } from './domain/question_runs.entity';
import { QuizRuns as QuizRunEntity } from './domain/quiz_runs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        QuizRunEntity,
        QuestionRunEntity
    ]),
  ],
  controllers: [
    GetResultQuizController
  ],
  providers: [
    ...servicesQuizProviders
  ],
})
export class QuizModule {}
