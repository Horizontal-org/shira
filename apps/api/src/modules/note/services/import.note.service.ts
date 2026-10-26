import { Inject, Injectable } from '@nestjs/common'
import * as path from 'path'
import { EntityManager } from 'typeorm'
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces'
import { ITransferTemplateImagesService } from 'src/modules/image/interfaces/services/transfer-template-images.service.interface'
import { remapImageIds } from 'src/modules/image/utils/remap-image-ids.util'
import { QuizItem } from 'src/modules/quiz/domain/quiz_items.entity'
import { QuestionSanitizer } from 'src/utils/question-sanitizer.util'
import { Note } from '../domain'
import { NoteImportValidationResult } from './validate-import.note.service'

@Injectable()
export class ImportNoteService {
  constructor(
    @Inject(TYPES_IMAGE.services.ITransferTemplateImagesService)
    private readonly transferTemplateImagesService: ITransferTemplateImagesService,
  ) { }

  async execute(
    manager: EntityManager,
    quizId: number,
    position: number,
    importedNote: NoteImportValidationResult,
  ): Promise<Note> {
    const note = await manager.save(Note, manager.create(Note, {
      name: importedNote.metadata.name,
      content: '',
    }))
    const images = importedNote.assets
      .map((asset) => ({
        id: this.parseAssetImageId(asset.fileName),
        name: asset.fileName,
        buffer: asset.buffer,
      }))
      .filter((image): image is { id: number; name: string; buffer: Buffer } => image.id !== null)

    const imageIdMap = await this.transferTemplateImagesService.transferNoteImages(
      manager,
      quizId,
      note,
      images,
      [importedNote.contentHtml],
    )
    note.content = remapImageIds(
      QuestionSanitizer.sanitizeQuestionContent(importedNote.contentHtml),
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

  private parseAssetImageId(fileName: string): number | null {
    const id = parseInt(path.basename(fileName, path.extname(fileName)), 10)
    return Number.isNaN(id) ? null : id
  }
}
