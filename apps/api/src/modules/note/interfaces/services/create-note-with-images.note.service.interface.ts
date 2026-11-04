import { EntityManager } from 'typeorm'
import { TransferableImage } from 'src/modules/image/interfaces/services/transfer-template-images.service.interface'
import { Note } from '../../domain'

export interface CreateNoteWithImagesParams {
  manager: EntityManager
  quizId: number
  position: number
  name: string
  content: string
  images: TransferableImage[]
}

export interface ICreateNoteWithImagesService {
  execute(params: CreateNoteWithImagesParams): Promise<Note>
}
