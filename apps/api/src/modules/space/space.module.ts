import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceEntity } from './domain/space.entity';
import { 
  servicesSpaceProviders,
  checkSpaceServiceProvider,
  createSpaceServiceProvider,
  validateHeaderSpaceServiceProvider
} from './space.providers';
import { UserEntity } from '../user/domain/user.entity';
import { spaceControllers } from './controllers';
import { Quiz } from '../quiz/domain/quiz.entity';
import { QuizQuestion } from '../quiz/domain/quizzes_questions.entity';
import { SpaceUserEntity } from './domain/space-users.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
        SpaceEntity,
        UserEntity,
        Quiz,
        QuizQuestion,
        SpaceUserEntity
    ]),
  ],  
  providers: [
    ...servicesSpaceProviders
  ],
  controllers: [...spaceControllers],
  exports: [
    checkSpaceServiceProvider,
    createSpaceServiceProvider,
    validateHeaderSpaceServiceProvider
  ]
})
export class SpaceModule {}
