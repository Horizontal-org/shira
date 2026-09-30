import { Inject, Injectable } from '@nestjs/common'
import { NoteImage as NoteImageEntity } from '../domain'
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface'
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces'
import { DuplicateNoteImagesParams, IDuplicateNoteImageService } from '../interfaces/services/duplicate.note_image.service.interface'

@Injectable()
export class DuplicateNoteImageService implements IDuplicateNoteImageService {

  constructor(
    @Inject(TYPES_IMAGE.services.IImageService)
    private imageService: IImageService
  ) {}

  async execute(params: DuplicateNoteImagesParams): Promise<string> {
    const { originalNoteId, targetNoteId, targetQuizId, manager } = params

    const originalImages = await manager.find(NoteImageEntity, { where: { noteId: originalNoteId } })

    let content = params.content
    for (const originalImage of originalImages) {
      const newImagePath = this.generateNewImagePath(originalImage.relativePath, targetQuizId)
      const newImage = manager.create(NoteImageEntity, {
        name: originalImage.name,
        relativePath: newImagePath,
        noteId: targetNoteId,
        quizId: targetQuizId
      })
      const savedImage = await manager.save(NoteImageEntity, newImage)
      await this.imageService.copyAndDeleteOrigin(originalImage.relativePath, newImagePath)

      content = content.replace(
        new RegExp(`data-image-id="${originalImage.id}"`, 'g'),
        `data-image-id="${savedImage.id}"`
      )
    }

    return content
  }

  private generateNewImagePath(originalPath: string, quizId: number): string {
    const timestamp = Date.now()
    const originalFileName = originalPath.split('/').pop()
    const fileExtension = originalFileName.split('.').pop()
    const baseFileName = originalFileName.replace(`.${fileExtension}`, '')

    const newFileName = `${timestamp}_copy_${baseFileName}.${fileExtension}`
    return `note-images/${quizId}/${newFileName}`
  }
}
