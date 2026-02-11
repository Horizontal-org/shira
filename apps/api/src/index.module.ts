import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { IndexController } from './index.controller';
import { IndexService } from './index.service';
import { typeOrmModuleOptions } from './ormconfig';
import { AppModule } from './modules/app/app.module';
import { FieldOfWorkModule } from './modules/field_of_work/field_of_work.module';
import { QuestionLibraryModule } from './modules/question_library/question.library.module';
import { QuestionModule } from './modules/question/question.module';
import { LanguageModule } from './modules/languages/language.module';
import { TranslationModule } from './modules/translation/translation.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { SurveyModule } from './modules/survey/survey.module';
import { PassphraseModule } from './modules/passphrase/passphrase.module';
import { SpaceModule } from './modules/space/space.module';
import { QueueModule } from './modules/queue/queue.module';
import { EmailModule } from './modules/email/email.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { QuestionImageModule } from './modules/question_image/question_image.module';
import { ImageModule } from './modules/image/image.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { BillingModule } from './modules/billing/billing.module';
import { QuizResultModule } from './modules/quiz_result/quiz-result.module';
import { LearnerModule } from './modules/learner/learner.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmModuleOptions),
    AppModule,
    SpaceModule,
    QueueModule,
    ImageModule,
    EmailModule,
    FieldOfWorkModule,
    QuestionLibraryModule,
    QuestionModule,
    QuestionImageModule,
    UserModule,
    AuthModule,
    SurveyModule,
    TranslationModule,
    LanguageModule,
    PassphraseModule,
    QuizModule,
    QuizResultModule,
    OrganizationModule,
    BillingModule,
    LearnerModule
  ],
  controllers: [IndexController],
  providers: [IndexService],
})
export class IndexModule {}
