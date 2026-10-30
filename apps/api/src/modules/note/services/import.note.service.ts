import { Inject, Injectable } from '@nestjs/common'
import * as path from 'path'
import { EntityManager } from 'typeorm'
import { Note } from '../domain'
import { TYPES } from '../interfaces'
import { ICreateNoteWithImagesService } from '../interfaces/services/create-note-with-images.note.service.interface'
import { IImportNoteService } from '../interfaces/services/import.note.service.interface'
import { NoteImportValidationResult } from '../interfaces/services/validate-import.note.service.interface'

@Injectable()
export class ImportNoteService implements IImportNoteService {
  constructor(
    @Inject(TYPES.services.ICreateNoteWithImagesService)
    private readonly createNoteWithImagesService: ICreateNoteWithImagesService,
  ) { }

  async execute(
    manager: EntityManager,
    quizId: number,
    position: number,
    importedNote: NoteImportValidationResult,
  ): Promise<Note> {
    const images = importedNote.assets
      .map((asset) => ({
        id: this.parseAssetImageId(asset.fileName),
        name: asset.fileName,
        buffer: asset.buffer,
      }))
      .filter((image): image is { id: number; name: string; buffer: Buffer } => image.id !== null)

    return this.createNoteWithImagesService.execute({
      manager,
      quizId,
      position,
      name: importedNote.metadata.name,
      content: importedNote.contentHtml,
      images,
    })
  }

  private parseAssetImageId(fileName: string): number | null {
    const basename = path.basename(fileName, path.extname(fileName))
    return /^\d+$/.test(basename) ? Number(basename) : null
  }
}
