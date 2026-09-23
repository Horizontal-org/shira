import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../domain/note.entity';
import { QuizItem } from 'src/modules/quiz/domain/quiz_items.entity'
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util';
import { IEditNoteService } from '../interfaces/services/edit.note.service.interface';
import { EditNoteDto } from '../dto/edit.note.dto';
import { TYPES as TYPES_NOTE_IMAGE } from 'src/modules/note_image/interfaces'
import { ISyncNoteImageService } from 'src/modules/note_image/interfaces/services/sync.note_image.service.interface'

@Injectable()
export class EditNoteService implements IEditNoteService {

  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
    @InjectRepository(QuizItem)
    private readonly quizItemRepo: Repository<QuizItem>,
    @Inject(TYPES_NOTE_IMAGE.services.ISyncNoteImageService)
    private readonly syncImagesService: ISyncNoteImageService,
  ) {}

  async execute(editNoteDto: EditNoteDto): Promise<void> {
    // quizId was validated against the space in the controller, make sure the note belongs to that quiz
    const quizItem = await this.quizItemRepo.findOne({
      where: {
        quizId: editNoteDto.quizId,
        entityType: 'note',
        entityId: editNoteDto.noteId,
      },
    })

    if (!quizItem) {
      throw new NotFoundException()
    }

    const note = await this.noteRepo.findOne({ where: { id: editNoteDto.noteId } });

    if (!note) {
      throw new NotFoundException();
    }

    note.name = editNoteDto.name;
    note.content = QuestionSanitizer.sanitizeQuestionContent(editNoteDto.content);
    note.updatedAt = new Date();

    await this.noteRepo.save(note);

    await this.syncImagesService.execute({
      imageIds: QuestionSanitizer.extractImageIds(note.content),
      noteId: note.id,
      quizId: editNoteDto.quizId
    })
  }
}
