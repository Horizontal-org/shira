import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionImage } from './domain';
import { servicesQuestionImageProviders } from './question_image.provider';
import { questionImageControllers } from './controllers';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionImage]),
    ImageModule
  ],
  controllers: [
    ...questionImageControllers
  ],
  providers: [
    ...servicesQuestionImageProviders
  ],
})

export class QuestionImageModule {}
