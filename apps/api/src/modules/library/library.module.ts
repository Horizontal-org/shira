import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConsoleModule } from 'nestjs-console'

import { App as AppEntity } from 'src/modules/app/domain/app.entity'
import { Language as LanguageEntity } from 'src/modules/languages/domain/languages.entity'
import { Explanation as ExplanationEntity } from 'src/modules/question/domain/explanation.entity'
import { Question as QuestionEntity } from 'src/modules/question/domain'
import { ExplanationTranslation as ExplanationTranslationEntity } from 'src/modules/translation/domain/explanationTranslation.entity'
import { QuestionTranslation as QuestionTranslationEntity } from 'src/modules/translation/domain/questionTranslation.entity'

import { libraryControllers } from './controller'
import { libraryServiceProviders } from './library.providers'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      QuestionEntity,
      QuestionTranslationEntity,
      ExplanationEntity,
      ExplanationTranslationEntity,
      AppEntity,
      LanguageEntity,
    ]),
    ConsoleModule,
  ],
  controllers: [...libraryControllers],
  providers: [...libraryServiceProviders],
})
export class LibraryModule { }
