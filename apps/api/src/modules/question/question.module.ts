import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { QuestionCommander } from './commander';
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
import { ListQuestionService } from './services/list.question.service';
import { SpaceExportQuestionService } from './services/spaceExport.question.service';
import { QuestionImage } from '../question_image/domain';
import { QuestionImageModule } from '../question_image/question_image.module';
import { QuizQuestion } from '../quiz/domain/quizzes_questions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionEntity,
      QuestionImage,
      AppEntity,
      FieldOfWorkEntity,
      ExplanationEntity,
      QuestionTranslation,
      ExplanationTranslationEntity,
      LanguageEntity,
      QuizQuestion,
    ]),
    QuestionImageModule,
    ConsoleModule,
  ],
  controllers: [...questionControllers],
  providers: [
    QuestionCommander,
    CreateQuestionService,
    ListQuestionService,
    GenerateQuizQuestionService,
    ParserQuestionService,
    GlobalParserQuestionService,
    SpaceExportQuestionService,
  ],
})
export class QuestionModule {}
