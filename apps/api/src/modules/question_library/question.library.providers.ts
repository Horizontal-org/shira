import { TYPES } from "./interfaces";
import { DuplicateLibraryQuestionService } from "./services/duplicate-question-library.service";
import { GetLibraryQuestionService } from "./services/get-question-library.service";

export const getQuestionLibraryProvider = {
  provide: TYPES.services.IGetLibraryQuestionService,
  useClass: GetLibraryQuestionService
}

export const duplicateQuestionLibraryProvider = {
  provide: TYPES.services.IDuplicateLibraryQuestionService,
  useClass: DuplicateLibraryQuestionService
}

export const servicesOrganizationProviders = [
  getQuestionLibraryProvider,
  duplicateQuestionLibraryProvider
]