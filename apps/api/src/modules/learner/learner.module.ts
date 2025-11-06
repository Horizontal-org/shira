import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Learner as LearnerEntity } from './domain/learner.entity';
import { InviteLearnerController } from './controllers/invite.learner.controller';
import { serviceLearnerProviders } from './learner.providers';
import { SpaceEntity } from '../space/domain/space.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([LearnerEntity, SpaceEntity]),
  ],
  controllers: [InviteLearnerController],
  providers: [...serviceLearnerProviders],
  exports: [...serviceLearnerProviders],
})
export class LearnerModule { }