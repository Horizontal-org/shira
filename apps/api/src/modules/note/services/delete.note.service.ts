import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuizItem } from 'src/modules/quiz/domain/quiz_items.entity';
import { Note } from '../domain/note.entity';
import { Quiz } from 'src/modules/quiz/domain/quiz.entity';
import { IDeleteNoteService } from '../interfaces/services/delete.note.service.interface';
import { DeleteNoteDto } from '../dto/delete.note.dto';
import { TYPES as TYPES_QUIZ } from 'src/modules/quiz/interfaces';
import { IQuizItemsService } from 'src/modules/quiz/interfaces/services/quiz-items.service.interface';

@Injectable()
export class DeleteNoteService implements IDeleteNoteService {

  constructor(
    @InjectRepository(QuizItem)
    private readonly quizItemRepo: Repository<QuizItem>,
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
    @InjectRepository(Quiz)
    private readonly quizRepo: Repository<Quiz>,
    @Inject(TYPES_QUIZ.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
  ) {}

  async execute(deleteDto: DeleteNoteDto): Promise<void> {
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

    // If this was the quiz's last remaining item, quiz_items has nothing left to
    // aggregate for list.quiz.service.ts's "latest updated" calculation - bump
    // explicitly, same as delete-question.quiz.service.ts does for the same reason.
    await this.quizRepo.update(deleteDto.quizId, { updatedAt: new Date() });
  }
}
