import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NoteImage } from './domain'
import { servicesNoteImageProviders } from './note_image.provider'
import { noteImageControllers } from './controllers'
import { ImageModule } from '../image/image.module'
import { QuizModule } from '../quiz/quiz.module'
import { QuizItem } from '../quiz/domain/quiz_items.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([NoteImage, QuizItem]),
    ImageModule,
    // QuizModule imports this module for the public view and duplication
    forwardRef(() => QuizModule)
  ],
  controllers: [
    ...noteImageControllers
  ],
  providers: [
    ...servicesNoteImageProviders
  ],
  exports: [
    ...servicesNoteImageProviders
  ]
})
export class NoteImageModule {}
