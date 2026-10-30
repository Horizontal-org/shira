import { Inject, Injectable } from '@nestjs/common'
import * as cheerio from 'cheerio'
import { fileTypeFromBuffer } from 'file-type'
import * as path from 'path'
import { TYPES as TYPES_IMAGE } from 'src/modules/image/interfaces'
import { IImageService } from 'src/modules/image/interfaces/services/image.service.interface'
import { Note } from '../domain'
import {
  ISpaceExportNoteService,
  NoteExportPackage,
} from '../interfaces/services/space-export.note.service.interface'

@Injectable()
export class SpaceExportNoteService implements ISpaceExportNoteService {
  constructor(
    @Inject(TYPES_IMAGE.services.IImageService)
    private readonly imageService: IImageService,
  ) { }

  async buildNotePackage(note: Note): Promise<NoteExportPackage> {
    const assetsWithIds = await Promise.all((note.images ?? []).map(async (image) => {
      const buffer = await this.imageService.download(image.relativePath)
      let extension = path.extname(image.name)
      if (!extension) {
        const type = await fileTypeFromBuffer(buffer)
        extension = type ? `.${type.ext}` : ''
      }
      return { imageId: image.id, fileName: `${image.id}${extension}`, buffer }
    }))

    const fileNameById = new Map(assetsWithIds.map((asset) => [asset.imageId, asset.fileName]))
    const $ = cheerio.load(note.content)
    for (const element of $('img').toArray()) {
      const imageId = parseInt($(element).attr('data-image-id'), 10)
      const fileName = fileNameById.get(imageId)
      if (fileName) $(element).attr('src', `assets/${fileName}`)
    }

    const assets = assetsWithIds.map(({ fileName, buffer }) => ({ fileName, buffer }))
    return { contentHtml: $('body').html() ?? '', assets }
  }
}
