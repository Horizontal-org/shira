import { Note } from '../../domain'

export interface NoteExportAsset {
  fileName: string
  buffer: Buffer
}

export interface NoteExportPackage {
  contentHtml: string
  assets: NoteExportAsset[]
}

export interface ISpaceExportNoteService {
  buildNotePackage(note: Note): Promise<NoteExportPackage>
}
