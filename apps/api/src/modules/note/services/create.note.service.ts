import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../domain/note.entity';
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util';
import { ICreateNoteService } from '../interfaces/services/create.note.service.interface';
import { CreateNoteDto } from '../dto/create.note.dto';
import { TYPES as TYPES_QUIZ } from 'src/modules/quiz/interfaces';
import { IQuizItemsService } from 'src/modules/quiz/interfaces/services/quiz-items.service.interface';

@Injectable()
export class CreateNoteService implements ICreateNoteService {

  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
    @Inject(TYPES_QUIZ.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
  ) {}

  async execute(createNoteDto: CreateNoteDto): Promise<void> {
    const note = this.noteRepo.create({
      name: createNoteDto.name,
      content: QuestionSanitizer.sanitizeQuestionContent(createNoteDto.content),
    });

    const savedNote = await this.noteRepo.save(note);

    await this.quizItemsService.append(createNoteDto.quizId, 'note', savedNote.id);
  }
}
