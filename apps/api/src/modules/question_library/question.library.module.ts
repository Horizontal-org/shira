import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question as QuestionEntity } from '../question/domain';
import { QuestionLibraryController } from './controller/question.library.controller';
import { servicesOrganizationProviders } from './question.library.providers';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionEntity
    ]),
    QuestionModule
  ],
  controllers: [
    QuestionLibraryController
  ],
  providers: [
    ...servicesOrganizationProviders
  ],
})

export class QuestionLibraryModule {}
