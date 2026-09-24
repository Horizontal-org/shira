import { CreateNoteController } from './create.note.controller'
import { EditNoteController } from './edit.note.controller'
import { DeleteNoteController } from './delete.note.controller'
import { GetNoteController } from './get.note.controller'
import { DuplicateNoteController } from './duplicate.note.controller'

export const noteControllers = [
  CreateNoteController,
  EditNoteController,
  DeleteNoteController,
  GetNoteController,
  DuplicateNoteController
]
