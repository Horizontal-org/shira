import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizItem } from '../domain/quiz_items.entity';
import { Note } from '../domain/note.entity';
import { Quiz } from '../domain/quiz.entity';
import { IDeleteNoteQuizService } from '../interfaces/services/delete-note.quiz.service.interface';
import { DeleteNoteQuizDto } from '../dto/delete-note.quiz.dto';
import { TYPES } from '../interfaces';
import { IQuizItemsService } from '../interfaces/services/quiz-items.service.interface';

@Injectable()
export class DeleteNoteQuizService implements IDeleteNoteQuizService {

  constructor(
    @InjectRepository(QuizItem)
    private readonly quizItemRepo: Repository<QuizItem>,
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @Inject(TYPES.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
  ) {}

  async execute(deleteDto: DeleteNoteQuizDto): Promise<void> {
    const quizItem = await this.quizItemRepo.findOne({
      where: {
        quizId: deleteDto.quizId,
        entityType: 'note',
        entityId: deleteDto.noteId,
      },
    });

    if (!quizItem) {
      throw new NotFoundException();
    }

    await this.quizItemsService.removeAndResequence(deleteDto.quizId, quizItem.id);

    await this.noteRepo.delete(deleteDto.noteId);

    // Notes don't participate in list.quiz.service.ts's "latest updated" aggregate
    // (that subquery is scoped to question items only), so bump this explicitly.
    await this.quizRepo.update(deleteDto.quizId, { updatedAt: new Date() });
  }
}
