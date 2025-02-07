import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExplanationTranslation as ExplanationTranslationEntity } from './domain/explanationTranslation.entity';
import { QuestionTranslation as QuestionTranslationEntity } from './domain/questionTranslation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ExplanationTranslationEntity,
      QuestionTranslationEntity,
    ]),
  ],
  controllers: [],
  providers: [],
})
export class TranslationModule {}
