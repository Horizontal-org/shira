import { Global, Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';
import { SpaceCommander } from './commander';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceEntity } from './domain/space.entity';
import {
  servicesSpaceProviders,
  checkSpaceServiceProvider,
  createSpaceServiceProvider,
  validateHeaderSpaceServiceProvider,
  associateUserSpaceServiceProvider
} from './space.providers';
import { UserEntity } from '../user/domain/user.entity';
import { spaceControllers } from './controllers';
import { Quiz } from '../quiz/domain/quiz.entity';
import { QuizQuestion } from '../quiz/domain/quizzes_questions.entity';
import { SpaceUserEntity } from './domain/space-users.entity';
import { RoleEntity } from '../user/domain/role.entity';
import { OrganizationUsersEntity } from '../organization/domain/organization_users.entity';
@Global()
@Module({
  imports: [
    ConsoleModule,
    TypeOrmModule.forFeature([
        SpaceEntity,
        UserEntity,
        Quiz,
        QuizQuestion,
        SpaceUserEntity,
        RoleEntity,
        OrganizationUsersEntity
    ]),
  ],  
  providers: [
    SpaceCommander,
    ...servicesSpaceProviders
  ],
  controllers: [...spaceControllers],
  exports: [
    checkSpaceServiceProvider,
    createSpaceServiceProvider,
    validateHeaderSpaceServiceProvider,
    associateUserSpaceServiceProvider
  ]
})
export class SpaceModule {}
