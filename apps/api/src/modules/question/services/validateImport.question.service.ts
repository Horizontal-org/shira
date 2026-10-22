import { Injectable } from '@nestjs/common'
import * as AdmZip from 'adm-zip'
import * as cheerio from 'cheerio'
import { QuestionImportMetadataDto } from '../dto/question-import-metadata.dto'
import { Asset } from './spaceExport.question.service'
import { ZipImportService } from './zip-import.service'
import { InvalidZipStructureException } from '../exceptions'

const METADATA_ENTRY = 'metadata.json'
const CONTENT_ENTRY = 'content.html'

export interface QuestionImportValidationResult {
  metadata: QuestionImportMetadataDto
  contentHtml: string
  assets: Asset[]
}

@Injectable()
export class ValidateQuestionImportService {
  constructor(private zipImportService: ZipImportService) { }

  async validate(buffer: Buffer): Promise<QuestionImportValidationResult> {
    const entries = await this.zipImportService.loadZipEntries(buffer)
    return this.validateEntries(entries, '')
  }

  async validateEntries(entries: AdmZip.IZipEntry[], basePath = ''): Promise<QuestionImportValidationResult> {
    const metadataEntry = entries.find((entry) => entry.entryName === `${basePath}${METADATA_ENTRY}`)
    const contentEntry = entries.find((entry) => entry.entryName === `${basePath}${CONTENT_ENTRY}`)

    if (!metadataEntry || !contentEntry) {
      throw new InvalidZipStructureException(
        `Zip must contain ${METADATA_ENTRY} and ${CONTENT_ENTRY} at ${basePath || 'its root'}`,
      )
    }

    const metadata = await this.zipImportService.parseAndValidateJson(
      metadataEntry.getData(),
      QuestionImportMetadataDto,
    )
    const contentHtml = contentEntry.getData().toString('utf8')

    const assetsPrefix = `${basePath}assets/`
    const assets: Asset[] = entries
      .filter((entry) => !entry.isDirectory && entry.entryName.startsWith(assetsPrefix))
      .map((entry) => ({
        fileName: entry.entryName.slice(assetsPrefix.length),
        buffer: entry.getData(),
      }))

    this.assertReferencedAssetsExist(contentHtml, assets)

    return { metadata, contentHtml, assets }
  }

  private assertReferencedAssetsExist(contentHtml: string, assets: Asset[]) {
    const $ = cheerio.load(contentHtml)
    const assetSet = new Set(assets.map((asset) => `assets/${asset.fileName}`))

    for (const el of $('img').toArray()) {
      const src = $(el).attr('src')
      if (src?.startsWith('assets/') && !assetSet.has(src)) {
        throw new InvalidZipStructureException(`content.html references missing asset: ${src}`)
      }
    }
  }
}
