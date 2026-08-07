import { TYPES } from './interfaces'
import { PublishQuestionLibraryService } from './services/publish-question.library.service'
import { PrepareQuestionsLibraryService } from './services/prepare-questions.library.service'
import { PublishQuizLibraryService } from './services/publish-quiz.library.service'
import { ShiraLibraryLoggerService } from './services/shira-library-logger.service'
import { ShiraLibraryService } from './services/shira-library.service'
import { CreateTemplateQuizService } from './services/create-template-quiz.library.service'
import { CreateTemplateQuestionService } from './services/create-template-question.library.service'
import { LibraryAuthService } from './services/library-auth.library.service'

export const publishQuestionLibraryProvider = {
  provide: TYPES.services.IPublishQuestionLibraryService,
  useClass: PublishQuestionLibraryService,
}

export const prepareQuestionsLibraryProvider = {
  provide: TYPES.services.IPrepareQuestionsLibraryService,
  useClass: PrepareQuestionsLibraryService,
}

export const publishQuizLibraryProvider = {
  provide: TYPES.services.IPublishQuizLibraryService,
  useClass: PublishQuizLibraryService,
}

export const shiraLibraryLoggerProvider = {
  provide: TYPES.services.IShiraLibraryLoggerService,
  useClass: ShiraLibraryLoggerService,
}

export const shiraLibraryProvider = {
  provide: TYPES.services.IShiraLibraryService,
  useClass: ShiraLibraryService,
}

export const createTemplateQuizLibraryProvider = {
  provide: TYPES.services.ICreateTemplateQuizService,
  useClass: CreateTemplateQuizService,
}

export const createTemplateQuestionLibraryProvider = {
  provide: TYPES.services.ICreateTemplateQuestionService,
  useClass: CreateTemplateQuestionService,
}

export const libraryAuthProvider = {
  provide: TYPES.services.ILibraryAuthService,
  useClass: LibraryAuthService,
}

export const libraryServiceProviders = [
  publishQuestionLibraryProvider,
  prepareQuestionsLibraryProvider,
  publishQuizLibraryProvider,
  shiraLibraryLoggerProvider,
  shiraLibraryProvider,
  createTemplateQuizLibraryProvider,
  createTemplateQuestionLibraryProvider,
  libraryAuthProvider,
]
