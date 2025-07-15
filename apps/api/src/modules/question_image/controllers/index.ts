import { CreateQuestionImageController } from './create.question_image.controller'
import { DeleteQuestionImageController } from './delete.question_image.controller'
import { SyncQuestionImageController } from './sync.question_image.controller'

export const questionImageControllers = [
  CreateQuestionImageController,
  SyncQuestionImageController,
  DeleteQuestionImageController
]