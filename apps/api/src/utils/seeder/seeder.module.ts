import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from 'src/modules/app/domain';
import { FieldOfWork } from 'src/modules/field_of_work/domain';
import { MessageType } from 'src/modules/message_type/domain';
import { Explanation, Question } from 'src/modules/question/domain';
import { typeOrmModuleOptions } from '../../ormconfig';
import { AppSeederService } from './entities/app.seeder';
import { FieldOfWorkSeederService } from './entities/field_of_work.seeder';
import { MessageTypeSeederService } from './entities/message_type.seeder';
import { Seeder } from './seeder.provider';
import { PlanEntity } from 'src/modules/billing/domain/plan.entity';
import { PlanSeederService } from './entities/plans.seeder';
import { Language } from 'src/modules/languages/domain';
import { QuestionTranslation } from 'src/modules/translation/domain/questionTranslation.entity';
import { ExplanationTranslation } from 'src/modules/translation/domain/explanationTranslation.entity';
import { UserEntity } from 'src/modules/user/domain/user.entity';
import { SpaceEntity } from 'src/modules/space/domain/space.entity';
import { SpaceUserEntity } from 'src/modules/space/domain/space-users.entity';
import { Quiz } from 'src/modules/quiz/domain/quiz.entity';
import { QuizQuestion } from 'src/modules/quiz/domain/quizzes_questions.entity';
import { SubscriptionEntity } from 'src/modules/billing/domain/subscription.entity';
import { OrganizationSubscriptionsEntity } from 'src/modules/organization/domain/organization_subscriptions.entity';
import { OrganizationEntity } from 'src/modules/organization/domain/organization.entity';
import { OrganizationUsersEntity } from 'src/modules/organization/domain/organization_users.entity';
import { RoleEntity } from 'src/modules/user/domain/role.entity';
import { QuestionImage } from 'src/modules/question_image/domain';
/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    TypeOrmModule.forFeature([
      App,
      Question,
      FieldOfWork,
      Explanation,
      MessageType,
      Language,
      QuestionTranslation,
      ExplanationTranslation,
      UserEntity,
      SpaceEntity,
      SpaceUserEntity,
      Quiz,
      QuizQuestion,
      PlanEntity,
      SubscriptionEntity,
      OrganizationSubscriptionsEntity,
      OrganizationEntity,
      OrganizationUsersEntity,
      RoleEntity,
      QuestionImage
    ])
  ],
  providers: [
    Logger,
    Seeder,
    AppSeederService,
    FieldOfWorkSeederService,
    PlanSeederService
  ],
})
export class SeederModule {}
