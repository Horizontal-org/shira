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
@Module({
  imports: [
    TypeOrmModule.forFeature([
        QuizEntity,
        QuizQuestionEntity,
        SpaceEntity
    ]),
  ],
  controllers: [
    CreateQuizController,
    ListQuizController,
    EditQuizController,
    DeleteQuizController,
    GetByIdQuizController,
    GetByHashQuizController
  ],
  providers: [
    ...servicesQuizProviders
  ],
})
export class QuizModule {}
