import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Quiz as QuizEntity } from './domain/quiz.entity';
import { QuizQuestion as QuizQuestionEntity } from './domain/quizzes_questions.entity';
import { SpaceEntity } from '../space/domain/space.entity';
import { CreateQuizController } from './controller/create.quiz.controller';
import { servicesQuizProviders } from './quiz.providers';
import { ListQuizController } from './controller/list.quiz.controller';
import { EditQuizController } from './controller/edit.quiz.controller';
import { DeleteQuizController } from './controller/delete.quiz.controller';
import { GetByIdQuizController } from './controller/get-by-id.quiz.controller';
import { GetByHashQuizController } from './controller/get-by-hash.quiz.controller';
import { Explanation, Question as QuestionEntity } from '../question/domain';
import { CreateQuestionQuizController } from './controller/create-question.quiz.controller';
import { QuestionTranslation } from '../translation/domain/questionTranslation.entity';
import { ExplanationTranslation } from '../translation/domain/explanationTranslation.entity';
import { Language } from '../languages/domain';
import { App } from '../app/domain';
import { EditQuestionQuizController } from './controller/edit-question.quiz.controller';
import { DeleteQuestionQuizController } from './controller/delete-question.quiz.controller';
import { ReorderQuestionQuizController } from './controller/reorder-question.quiz.controller';
import { QuestionImage } from '../question_image/domain';
import { QuestionImageModule } from '../question_image/question_image.module';
import { GetResultQuizController } from './controller/get-result.quiz.controller';
import { QuestionRun as QuestionRunEntity } from './domain/question_runs.entity';
import { QuizRuns as QuizRunEntity } from './domain/quiz_runs.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        QuizEntity,
        QuizQuestionEntity,
        SpaceEntity,
        QuestionEntity,
        Explanation,
        QuestionTranslation,
        ExplanationTranslation,
        Language,
        QuestionImage,
        App,
        QuizRunEntity,
        QuestionRunEntity
    ]),
    QuestionImageModule
  ],
  controllers: [
    CreateQuizController,
    ListQuizController,
    DeleteQuizController,
    GetByIdQuizController,
    GetByHashQuizController,
    ReorderQuestionQuizController,
    CreateQuestionQuizController,
    EditQuestionQuizController,
    DeleteQuestionQuizController,
    EditQuizController,
    GetResultQuizController
  ],
  providers: [
    ...servicesQuizProviders
  ],
})
export class QuizModule {}
