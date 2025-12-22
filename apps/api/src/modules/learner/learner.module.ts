import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Learner as LearnerEntity } from './domain/learner.entity';
import { serviceLearnerProviders, serviceLearnerQuizProviders } from './learner.providers';
import { SpaceEntity } from '../space/domain/space.entity';
import { PublicLearnerQuizController } from './controllers/public.learner_quiz.controller';
import { LearnerQuiz as LearnerQuizEntity } from './domain/learners_quizzes.entity';
import { Quiz as QuizEntity } from '../quiz/domain/quiz.entity';
import { QuizModule } from '../quiz/quiz.module';
import { PublicLearnerController } from './controllers/public.learner.controller';
import { AuthLearnerController } from './controllers/auth.learner.controller';
import { AuthLearnerQuizController } from './controllers/auth.learner_quiz.controller';

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
    PublicLearnerQuizController,
    PublicLearnerController,
    AuthLearnerController,
    AuthLearnerQuizController
  ],
  providers: [
    ...serviceLearnerProviders,
    ...serviceLearnerQuizProviders
  ],
  exports: [...serviceLearnerProviders],
})

export class LearnerModule { }