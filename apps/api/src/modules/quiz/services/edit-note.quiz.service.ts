import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../domain/note.entity';
import { Quiz } from '../domain/quiz.entity';
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util';
import { IEditNoteQuizService } from '../interfaces/services/edit-note.quiz.service.interface';
import { EditNoteQuizDto } from '../dto/edit-note.quiz.dto';

@Injectable()
export class EditNoteQuizService implements IEditNoteQuizService {

  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
  ) {}

  async execute(editNoteDto: EditNoteQuizDto): Promise<void> {
    const note = await this.noteRepo.findOne({ where: { id: editNoteDto.noteId } });

    if (!note) {
      throw new NotFoundException();
    }

    note.name = editNoteDto.name;
    note.content = QuestionSanitizer.sanitizeQuestionContent(editNoteDto.content);
    note.updatedAt = new Date();

    await this.noteRepo.save(note);

    // Notes don't participate in list.quiz.service.ts's "latest updated" aggregate
    // (that subquery is scoped to question items only), so bump this explicitly.
    await this.quizRepo.update(editNoteDto.quizId, { updatedAt: new Date() });
  }
}
