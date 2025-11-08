import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Learner as LearnerEntity } from './domain/learner.entity';
import { LearnerController } from './controllers/learner.controller';
import { serviceLearnerProviders } from './learner.providers';
import { SpaceEntity } from '../space/domain/space.entity';
import { LearnerQuiz } from './domain/learners_quizzes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LearnerEntity,
      LearnerQuiz,
      SpaceEntity
    ]),
  ],
  controllers: [LearnerController],
  providers: [...serviceLearnerProviders],
  exports: [...serviceLearnerProviders],
})

export class LearnerModule { }