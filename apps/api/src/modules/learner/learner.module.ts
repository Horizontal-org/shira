import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Learner as LearnerEntity } from './domain/learner.entity';
import { LearnerController } from './controllers/learner.controller';
import { serviceLearnerProviders, serviceLearnerQuizProviders } from './learner.providers';
import { SpaceEntity } from '../space/domain/space.entity';
import { LearnerQuizController } from './controllers/learner_quiz.controller';
import { LearnerQuiz as LearnerQuizEntity } from './domain/learners_quizzes.entity';
import { Quiz as QuizEntity } from '../quiz/domain/quiz.entity';
import { QuizModule } from '../quiz/quiz.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LearnerEntity,
      LearnerQuizEntity, 
      SpaceEntity,
      QuizEntity
    ]),
    QuizModule
  ],
  controllers: [
    // LearnerController, 
    LearnerQuizController
  ],
  providers: [
    // ...serviceLearnerProviders, 
    ...serviceLearnerQuizProviders
  ],
  // exports: [...serviceLearnerProviders],
})
export class LearnerModule { }