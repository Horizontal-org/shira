import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Note } from '../domain/note.entity'
import { QuizItem } from 'src/modules/quiz/domain/quiz_items.entity'
import { IDuplicateNoteService } from '../interfaces/services/duplicate.note.service.interface'
import { DuplicateNoteDto } from '../dto/duplicate.note.dto'
import { TYPES as TYPES_QUIZ } from 'src/modules/quiz/interfaces'
import { IQuizItemsService } from 'src/modules/quiz/interfaces/services/quiz-items.service.interface'
import { TYPES as TYPES_NOTE_IMAGE } from 'src/modules/note_image/interfaces'
import { IDuplicateNoteImageService } from 'src/modules/note_image/interfaces/services/duplicate.note_image.service.interface'

@Injectable()
export class DuplicateNoteService implements IDuplicateNoteService {

  constructor(
    @Inject(TYPES_QUIZ.services.IQuizItemsService)
    private readonly quizItemsService: IQuizItemsService,
    @Inject(TYPES_NOTE_IMAGE.services.IDuplicateNoteImageService)
    private readonly duplicateNoteImageService: IDuplicateNoteImageService,
    private readonly dataSource: DataSource,
  ) {}

  private readonly NOTE_NAME_MAX_LENGTH = 100

  async execute(duplicateDto: DuplicateNoteDto): Promise<void> {
    const { quizId, noteId } = duplicateDto

    await this.dataSource.transaction(async manager => {
      // also guarantees the note belongs to this quiz
      const quizItem = await manager.findOne(QuizItem, {
        where: { quizId, entityType: 'note', entityId: noteId },
      })

      if (!quizItem) {
        throw new NotFoundException()
      }

      const originalNote = await manager.findOne(Note, { where: { id: noteId } })

      if (!originalNote) {
        throw new NotFoundException()
      }

      const savedNote = await manager.save(Note, manager.create(Note, {
        name: this.truncateName(`Copy of ${originalNote.name}`),
        content: originalNote.content,
      }))

      const remappedContent = await this.duplicateNoteImageService.execute({
        originalNoteId: originalNote.id,
        content: savedNote.content,
        targetNoteId: savedNote.id,
        targetQuizId: quizId,
        manager
      })

      if (remappedContent !== savedNote.content) {
        await manager.update(Note, savedNote.id, { content: remappedContent })
      }

      await this.quizItemsService.insertAfter(quizId, quizItem.id, 'note', savedNote.id, manager)
    })
  }

  private truncateName(name: string): string {
    if (name.length <= this.NOTE_NAME_MAX_LENGTH) {
      return name
    }

    return `${name.slice(0, this.NOTE_NAME_MAX_LENGTH - 3)}...`
  }
}
