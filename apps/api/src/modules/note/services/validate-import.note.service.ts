import { Injectable } from '@nestjs/common'
import * as AdmZip from 'adm-zip'
import * as cheerio from 'cheerio'
import { InvalidZipStructureException } from 'src/modules/question/exceptions'
import { NoteExportAsset } from '../interfaces/services/space-export.note.service.interface'
import {
  IValidateNoteImportService,
  NoteImportMetadata,
  NoteImportValidationResult,
} from '../interfaces/services/validate-import.note.service.interface'

@Injectable()
export class ValidateNoteImportService implements IValidateNoteImportService {
  validateEntries(
    entries: AdmZip.IZipEntry[],
    basePath: string,
    metadata: NoteImportMetadata,
  ): NoteImportValidationResult {
    const contentEntry = entries.find((entry) => entry.entryName === `${basePath}content.html`)
    if (!contentEntry) {
      throw new InvalidZipStructureException(`Zip must contain content.html at ${basePath}`)
    }

    const assetsPrefix = `${basePath}assets/`
    const assets = entries
      .filter((entry) => !entry.isDirectory && entry.entryName.startsWith(assetsPrefix))
      .map((entry) => ({
        fileName: entry.entryName.slice(assetsPrefix.length),
        buffer: entry.getData(),
      }))
    const contentHtml = contentEntry.getData().toString('utf8')
    this.assertReferencedAssetsExist(contentHtml, assets)

    return { metadata, contentHtml, assets }
  }

  private assertReferencedAssetsExist(contentHtml: string, assets: NoteExportAsset[]) {
    const $ = cheerio.load(contentHtml)
    const assetSet = new Set(assets.map((asset) => `assets/${asset.fileName}`))
    for (const element of $('img').toArray()) {
      const src = $(element).attr('src')
      if (src?.startsWith('assets/') && !assetSet.has(src)) {
        throw new InvalidZipStructureException(`content.html references missing asset: ${src}`)
      }
    }
  }
}
