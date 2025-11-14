import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Learner as LearnerEntity } from './domain/learner.entity';
import { LearnerQuiz as LearnerQuizEntity } from './domain/learners_quizzes.entity';
import { SpaceEntity } from '../space/domain/space.entity';
import { PublicLearnerController } from './controllers/public.learner.controller';
import { AuthLearnerController } from './controllers/ auth.learner.controller';
import { serviceLearnerProviders } from './learner.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LearnerEntity,
      LearnerQuizEntity,
      SpaceEntity
    ]),
  ],
  controllers: [
    PublicLearnerController,
    AuthLearnerController
  ],
  providers: [...serviceLearnerProviders],
  exports: [...serviceLearnerProviders],
})

export class LearnerModule { }