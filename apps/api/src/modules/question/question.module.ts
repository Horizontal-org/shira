import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App as AppEntity } from '../app/domain';
import { FieldOfWork as FieldOfWorkEntity } from '../field_of_work/domain';
import { Explanation as ExplanationEntity } from '../question/domain';
import { questionControllers } from './controllers';
import { QuestionTranslation } from '../translation/domain/questionTranslation.entity';
import { ExplanationTranslation as ExplanationTranslationEntity } from '../translation/domain/explanationTranslation.entity';
import { Language as LanguageEntity } from '../languages/domain';
import { Question as QuestionEntity } from './domain';

// services
import { CreateQuestionService } from './services/create.question.service';
import { GenerateQuizQuestionService } from './services/quiz.question.service';
import { ParserQuestionService } from './services/individualParser.question.service';
import { GlobalParserQuestionService } from './services/globalParser.question.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionEntity,
      AppEntity,
      FieldOfWorkEntity,
      ExplanationEntity,
      QuestionTranslation,
      ExplanationTranslationEntity,
      LanguageEntity,
    ]),
  ],
  controllers: [...questionControllers],
  providers: [
    CreateQuestionService,
    GenerateQuizQuestionService,
    ParserQuestionService,
    GlobalParserQuestionService,
  ],
})
export class QuestionModule {}
