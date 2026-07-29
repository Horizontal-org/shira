import { TYPES } from './interfaces'
import { PublishQuestionLibraryService } from './services/publish-question.library.service'

export const publishQuestionLibraryProvider = {
  provide: TYPES.services.IPublishQuestionLibraryService,
  useClass: PublishQuestionLibraryService,
}

export const libraryServiceProviders = [publishQuestionLibraryProvider]
