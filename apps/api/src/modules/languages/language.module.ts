import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './domain/languages.entity';
import { languageControllers } from './controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  controllers: [...languageControllers],
  providers: [],
})

export class LanguageModule {}
