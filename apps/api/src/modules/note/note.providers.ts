import { TYPES } from './interfaces';
import { CreateNoteService } from './services/create.note.service';
import { EditNoteService } from './services/edit.note.service';
import { DeleteNoteService } from './services/delete.note.service';
import { GetNoteService } from './services/get.note.service';
import { DuplicateNoteService } from './services/duplicate.note.service';
import { ImportNoteService } from './services/import.note.service';
import { SpaceExportNoteService } from './services/space-export.note.service';
import { ValidateNoteImportService } from './services/validate-import.note.service';
import { CreateNoteWithImagesService } from './services/create-note-with-images.note.service';

export const createNoteServiceProvider = {
  provide: TYPES.services.ICreateNoteService,
  useClass: CreateNoteService
}

export const editNoteServiceProvider = {
  provide: TYPES.services.IEditNoteService,
  useClass: EditNoteService
}

export const deleteNoteServiceProvider = {
  provide: TYPES.services.IDeleteNoteService,
  useClass: DeleteNoteService
}

export const getNoteServiceProvider = {
  provide: TYPES.services.IGetNoteService,
  useClass: GetNoteService
}

export const duplicateNoteServiceProvider = {
  provide: TYPES.services.IDuplicateNoteService,
  useClass: DuplicateNoteService
}

export const importNoteServiceProvider = {
  provide: TYPES.services.IImportNoteService,
  useClass: ImportNoteService,
}

export const spaceExportNoteServiceProvider = {
  provide: TYPES.services.ISpaceExportNoteService,
  useClass: SpaceExportNoteService,
}

export const validateNoteImportServiceProvider = {
  provide: TYPES.services.IValidateNoteImportService,
  useClass: ValidateNoteImportService,
}

export const createNoteWithImagesServiceProvider = {
  provide: TYPES.services.ICreateNoteWithImagesService,
  useClass: CreateNoteWithImagesService,
}

export const servicesNoteProviders = [
  createNoteServiceProvider,
  editNoteServiceProvider,
  deleteNoteServiceProvider,
  getNoteServiceProvider,
  duplicateNoteServiceProvider,
  importNoteServiceProvider,
  spaceExportNoteServiceProvider,
  validateNoteImportServiceProvider,
  createNoteWithImagesServiceProvider,
];
