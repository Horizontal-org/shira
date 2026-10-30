import * as AdmZip from 'adm-zip'
import { NoteExportAsset } from './space-export.note.service.interface'

export interface NoteImportMetadata {
  id: number
  name: string
  position: number
}

export interface NoteImportValidationResult {
  metadata: NoteImportMetadata
  contentHtml: string
  assets: NoteExportAsset[]
}

export interface IValidateNoteImportService {
  validateEntries(
    entries: AdmZip.IZipEntry[],
    basePath: string,
    metadata: NoteImportMetadata,
  ): NoteImportValidationResult
}
