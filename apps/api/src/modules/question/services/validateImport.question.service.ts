import { Injectable } from '@nestjs/common'
import * as AdmZip from 'adm-zip'
import * as cheerio from 'cheerio'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { fileTypeFromBuffer } from 'file-type'
import { QuestionImportMetadataDto } from '../dto/question-import-metadata.dto'
import { Asset } from './spaceExport.question.service'
import {
  InvalidQuestionMetadataException,
  InvalidZipStructureException,
} from '../exceptions'

const MAX_UNCOMPRESSED_SIZE = 300 * 1024 * 1024 // 300MB, shared by single-question and whole-quiz imports
const METADATA_ENTRY = 'metadata.json'
const CONTENT_ENTRY = 'content.html'

export interface QuestionImportValidationResult {
  metadata: QuestionImportMetadataDto
  contentHtml: string
  assets: Asset[]
}

@Injectable()
export class ValidateQuestionImportService {
  async validate(buffer: Buffer): Promise<QuestionImportValidationResult> {
    const entries = await this.loadZipEntries(buffer)
    return this.validateEntries(entries, '')
  }

  async loadZipEntries(buffer: Buffer): Promise<AdmZip.IZipEntry[]> {
    const type = await fileTypeFromBuffer(buffer)
    if (!type || type.mime !== 'application/zip') {
      throw new InvalidZipStructureException('Uploaded file is not a zip archive')
    }

    const zip = this.readZip(buffer)
    const entries = zip.getEntries()

    this.assertSafeEntries(entries)

    return entries
  }

  async validateEntries(entries: AdmZip.IZipEntry[], basePath = ''): Promise<QuestionImportValidationResult> {
    const metadataEntry = entries.find((entry) => entry.entryName === `${basePath}${METADATA_ENTRY}`)
    const contentEntry = entries.find((entry) => entry.entryName === `${basePath}${CONTENT_ENTRY}`)

    if (!metadataEntry || !contentEntry) {
      throw new InvalidZipStructureException(
        `Zip must contain ${METADATA_ENTRY} and ${CONTENT_ENTRY} at ${basePath || 'its root'}`,
      )
    }

    const metadata = await this.parseMetadata(metadataEntry.getData())
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

  private readZip(buffer: Buffer): AdmZip {
    try {
      return new AdmZip(buffer)
    } catch {
      throw new InvalidZipStructureException('Zip file is corrupt or unreadable')
    }
  }

  private assertSafeEntries(entries: AdmZip.IZipEntry[]) {
    let totalSize = 0

    for (const entry of entries) {
      if (entry.entryName.includes('..') || entry.entryName.startsWith('/')) {
        throw new InvalidZipStructureException('Zip contains an unsafe entry path')
      }

      totalSize += entry.header.size
      if (totalSize > MAX_UNCOMPRESSED_SIZE) {
        throw new InvalidZipStructureException('Zip contents exceed the allowed uncompressed size')
      }
    }
  }

  private async parseMetadata(raw: Buffer): Promise<QuestionImportMetadataDto> {
    let parsed: unknown
    try {
      parsed = JSON.parse(raw.toString('utf8'))
    } catch {
      throw new InvalidQuestionMetadataException('metadata.json is not valid JSON')
    }

    const metadata = plainToInstance(QuestionImportMetadataDto, parsed)
    const errors = await validate(metadata)
    if (errors.length > 0) {
      throw new InvalidQuestionMetadataException(
        errors.map((error) => Object.values(error.constraints ?? {}).join(', ')).join('; '),
      )
    }

    return metadata
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
