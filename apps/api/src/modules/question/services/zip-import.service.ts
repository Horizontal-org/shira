import { Injectable } from '@nestjs/common'
import * as AdmZip from 'adm-zip'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { fileTypeFromBuffer } from 'file-type'
import {
  InvalidQuestionMetadataException,
  InvalidZipStructureException,
} from '../exceptions'

const MAX_UNCOMPRESSED_SIZE = 300 * 1024 * 1024 // 300MB, shared by single-question and whole-quiz imports

@Injectable()
export class ZipImportService {
  async loadZipEntries(buffer: Buffer): Promise<AdmZip.IZipEntry[]> {
    const type = await fileTypeFromBuffer(buffer)
    if (!type || type.mime !== 'application/zip') {
      throw new InvalidZipStructureException('Uploaded file is not a zip archive')
    }

    const zip = this.readZip(buffer)
    const entries = zip.getEntries()

    this.assertSafeEntries(entries)

    return this.stripSingleRootFolder(entries)
  }

  async parseAndValidateJson<T extends object>(raw: Buffer, cls: new () => T): Promise<T> {
    let parsed: unknown
    try {
      parsed = JSON.parse(raw.toString('utf8'))
    } catch {
      throw new InvalidQuestionMetadataException('metadata.json is not valid JSON')
    }

    const instance = plainToInstance(cls, parsed)
    const errors = await validate(instance as object)
    if (errors.length > 0) {
      throw new InvalidQuestionMetadataException(
        errors.map((error) => Object.values(error.constraints ?? {}).join(', ')).join('; '),
      )
    }

    return instance
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

  private stripSingleRootFolder(entries: AdmZip.IZipEntry[]): AdmZip.IZipEntry[] {
    const names = entries.map((entry) => entry.entryName).filter(Boolean)
    if (names.length === 0) {
      return entries
    }

    const topLevelSegments = new Set(names.map((name) => name.split('/')[0]))
    if (topLevelSegments.size !== 1) {
      // Zip already has multiple things at its root (the expected shape) — nothing to strip.
      return entries
    }

    const [wrapperFolder] = topLevelSegments
    const prefix = `${wrapperFolder}/`

    return entries
      .filter((entry) => entry.entryName.startsWith(prefix) && entry.entryName !== prefix)
      .map((entry) => {
        entry.entryName = entry.entryName.slice(prefix.length)
        return entry
      })
  }
}
