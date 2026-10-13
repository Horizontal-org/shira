import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../domain/note.entity';
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util';
import { ICreateNoteService } from '../interfaces/services/create.note.service.interface';
import { CreateNoteDto } from '../dto/create.note.dto';
import { TYPES as TYPES_QUIZ } from 'src/modules/quiz/interfaces';
import { IQuizItemsService } from 'src/modules/quiz/interfaces/services/quiz-items.service.interface';
import { TYPES as TYPES_NOTE_IMAGE } from 'src/modules/note_image/interfaces'
import { ISyncNoteImageService } from 'src/modules/note_image/interfaces/services/sync.note_image.service.interface'

@Injectable()
export class CreateNoteService implements ICreateNoteService {

  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
    @Inject(TYPES_QUIZ.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
    @Inject(TYPES_NOTE_IMAGE.services.ISyncNoteImageService)
    private readonly syncImagesService: ISyncNoteImageService,
  ) {}

  async execute(createNoteDto: CreateNoteDto): Promise<void> {
    const note = this.noteRepo.create({
      name: createNoteDto.name,
      content: QuestionSanitizer.sanitizeQuestionContent(createNoteDto.content),
    });

    const savedNote = await this.noteRepo.save(note);

    await this.quizItemsService.append(createNoteDto.quizId, 'note', savedNote.id);

    await this.syncImagesService.execute({
      imageIds: QuestionSanitizer.extractImageIds(savedNote.content),
      noteId: savedNote.id,
      quizId: createNoteDto.quizId
    })
  }
}
