import { TYPES } from './interfaces'
import { PublishQuestionLibraryService } from './services/publish-question.library.service'
import { PrepareQuestionsLibraryService } from './services/prepare-questions.library.service'
import { PublishQuizLibraryService } from './services/publish-quiz.library.service'

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

export const libraryServiceProviders = [publishQuestionLibraryProvider, prepareQuestionsLibraryProvider, publishQuizLibraryProvider]
