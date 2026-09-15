import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../domain/note.entity';
import { Quiz } from '../domain/quiz.entity';
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util';
import { ICreateNoteQuizService } from '../interfaces/services/create-note.quiz.service.interface';
import { CreateNoteQuizDto } from '../dto/create-note.quiz.dto';
import { TYPES } from '../interfaces';
import { IQuizItemsService } from '../interfaces/services/quiz-items.service.interface';

@Injectable()
export class CreateNoteQuizService implements ICreateNoteQuizService {

  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @Inject(TYPES.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
  ) {}

  async execute(createNoteDto: CreateNoteQuizDto): Promise<void> {
    const note = this.noteRepo.create({
      name: createNoteDto.name,
      content: QuestionSanitizer.sanitizeQuestionContent(createNoteDto.content),
    });

    const savedNote = await this.noteRepo.save(note);

    await this.quizItemsService.append(createNoteDto.quizId, 'note', savedNote.id);

    // Notes don't participate in list.quiz.service.ts's "latest updated" aggregate
    // (that subquery is scoped to question items only), so bump this explicitly.
    await this.quizRepo.update(createNoteDto.quizId, { updatedAt: new Date() });
  }
}
