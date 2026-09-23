import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Note } from '../domain/note.entity'
import { IGetNoteService, GetNoteServiceResponse } from '../interfaces/services/get.note.service.interface'
import { TYPES as TYPES_NOTE_IMAGE } from 'src/modules/note_image/interfaces'
import { IGenerateUrlsNoteImageService } from 'src/modules/note_image/interfaces/services/generate_urls.note_image.service.interface'

@Injectable()
export class GetNoteService implements IGetNoteService {

  constructor(
    @InjectRepository(Note)
    private readonly noteRepo: Repository<Note>,
    @Inject(TYPES_NOTE_IMAGE.services.IGenerateUrlsNoteImageService)
    private readonly getImageUrls: IGenerateUrlsNoteImageService,
  ) {}

  async execute(spaceId: number, id: number): Promise<GetNoteServiceResponse> {
    const note = await this.noteRepo
      .createQueryBuilder('note')
      .innerJoin('quiz_items', 'quizItems', "quizItems.entityId = note.id AND quizItems.entityType = 'note'")
      .innerJoin('quizItems.quiz', 'quiz')
      .where('note.id = :id', { id })
      .andWhere('quiz.space_id = :spaceId', { spaceId })
      .getOne()

    if (!note) {
      throw new NotFoundException()
    }

    return {
      id: note.id,
      name: note.name,
      content: note.content,
      images: await this.getImageUrls.byNote(note.id)
    }
  }
}
