import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './domain';
import { Quiz } from 'src/modules/quiz/domain/quiz.entity';
import { QuizItem } from 'src/modules/quiz/domain/quiz_items.entity';
import { QuizModule } from 'src/modules/quiz/quiz.module';
import { noteControllers } from './controllers';
import { servicesNoteProviders } from './note.providers';
import { NoteImageModule } from 'src/modules/note_image/note_image.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Note, Quiz, QuizItem]),
    QuizModule,
    NoteImageModule,
  ],
  controllers: [
    ...noteControllers
  ],
  providers: [
    ...servicesNoteProviders
  ],
  exports: [
    ...servicesNoteProviders
  ],
})
export class NoteModule { }
