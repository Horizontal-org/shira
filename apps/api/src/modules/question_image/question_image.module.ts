import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionImage } from './domain';
import { servicesQuestionImageProviders } from './question_image.provider';
import { questionImageControllers } from './controllers';
import { ImageModule } from '../image/image.module';
import { QuestionImageSubscriber } from './events/events.question_image';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionImage]),
    ImageModule
  ],
  controllers: [
    ...questionImageControllers
  ],
  providers: [
    QuestionImageSubscriber,
    ...servicesQuestionImageProviders
  ],
  exports: [
    ...servicesQuestionImageProviders
  ]
})

export class QuestionImageModule {}
