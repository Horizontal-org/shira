import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Learner as LearnerEntity } from './domain/learner.entity';
import { LearnerQuiz as LearnerQuizEntity } from './domain/learners_quizzes.entity';
import { SpaceEntity } from '../space/domain/space.entity';
import { LearnerController } from './controllers/learner.controller';
import { serviceLearnerProviders } from './learner.providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LearnerEntity,
      LearnerQuizEntity,
      SpaceEntity
    ]),
  ],
  controllers: [LearnerController],
  providers: [...serviceLearnerProviders],
  exports: [...serviceLearnerProviders],
})

export class LearnerModule { }