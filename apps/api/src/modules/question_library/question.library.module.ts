import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question as QuestionEntity } from '../question/domain';
import { GetLibraryQuestionsController } from './controller/library.question.controller';
import { GetLibraryQuestionService } from './services/library.question.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [GetLibraryQuestionsController],
  providers: [GetLibraryQuestionService],
  exports: [TypeOrmModule],
})

export class QuestionLibraryModule {}
