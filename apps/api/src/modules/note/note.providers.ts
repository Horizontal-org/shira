import { TYPES } from './interfaces';
import { CreateNoteService } from './services/create.note.service';
import { EditNoteService } from './services/edit.note.service';
import { DeleteNoteService } from './services/delete.note.service';

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

export const servicesNoteProviders = [
  createNoteServiceProvider,
  editNoteServiceProvider,
  deleteNoteServiceProvider,
];
