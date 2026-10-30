import { Inject, Injectable } from '@nestjs/common'
import { EntityManager } from 'typeorm'
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces'
import {
  ITransferTemplateImagesService,
  TransferableImage,
} from 'src/modules/image/interfaces/services/transfer-template-images.service.interface'
import { remapImageIds } from 'src/modules/image/utils/remap-image-ids.util'
import { QuizItem } from 'src/modules/quiz/domain/quiz_items.entity'
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util'
import { Note } from '../domain'

export interface CreateNoteWithImagesParams {
  manager: EntityManager
  quizId: number
  position: number
  name: string
  content: string
  images: TransferableImage[]
}

@Injectable()
export class CreateNoteWithImagesService {
  constructor(
    @Inject(TYPES_IMAGE.services.ITransferTemplateImagesService)
    private readonly transferTemplateImagesService: ITransferTemplateImagesService,
  ) { }

  async execute({
    manager,
    quizId,
    position,
    name,
    content,
    images,
  }: CreateNoteWithImagesParams): Promise<Note> {
    const note = await manager.save(Note, manager.create(Note, {
      name,
      content: '',
    }))

    const imageIdMap = await this.transferTemplateImagesService.transferNoteImages(
      manager,
      quizId,
      note,
      images,
      [content],
    )

    note.content = remapImageIds(
      QuestionSanitizer.sanitizeQuestionContent(content),
      imageIdMap,
    )
    await manager.save(Note, note)
    await manager.save(QuizItem, manager.create(QuizItem, {
      quizId,
      entityType: 'note',
      entityId: note.id,
      position,
    }))

    return note
  }
}
