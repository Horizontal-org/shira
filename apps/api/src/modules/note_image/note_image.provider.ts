import { TYPES } from './interfaces'
import { CreateNoteImageService } from './services/create.note_image.service'
import { SyncNoteImageService } from './services/sync.note_image.service'
import { GenerateUrlsNoteImageService } from './services/generate_urls.note_image.service'
import { DuplicateNoteImageService } from './services/duplicate.note_image.service'

export const createNoteImageServiceProvider = {
  provide: TYPES.services.ICreateNoteImageService,
  useClass: CreateNoteImageService,
}

export const syncNoteImageServiceProvider = {
  provide: TYPES.services.ISyncNoteImageService,
  useClass: SyncNoteImageService,
}

export const generateUrlsNoteImageServiceProvider = {
  provide: TYPES.services.IGenerateUrlsNoteImageService,
  useClass: GenerateUrlsNoteImageService
}

export const duplicateNoteImageServiceProvider = {
  provide: TYPES.services.IDuplicateNoteImageService,
  useClass: DuplicateNoteImageService
}

export const servicesNoteImageProviders = [
  createNoteImageServiceProvider,
  syncNoteImageServiceProvider,
  generateUrlsNoteImageServiceProvider,
  duplicateNoteImageServiceProvider
]
