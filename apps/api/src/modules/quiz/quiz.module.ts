import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Quiz as QuizEntity } from './domain/quiz.entity';
import { QuizQuestion as QuizQuestionEntity } from './domain/quizzes_questions.entity';
import { SpaceEntity } from '../space/domain/space.entity';
import { CreateQuizController } from './controller/create.quiz.controller';
import { servicesQuizProviders } from './quiz.providers';
@Module({
  imports: [
    TypeOrmModule.forFeature([
        QuizEntity,
        QuizQuestionEntity,
        SpaceEntity
    ]),
  ],
  controllers: [
    CreateQuizController
  ],
  providers: [
    ...servicesQuizProviders
  ],
})
export class QuizModule {}
