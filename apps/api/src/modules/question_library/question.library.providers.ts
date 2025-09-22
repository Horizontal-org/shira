import { TYPES } from "./interfaces";
import { GetLibraryQuestionService } from "./services/question.library.service";

export const getQuestionLibraryProvider = {
    provide: TYPES.services.IGetLibraryQuestionService,
    useClass: GetLibraryQuestionService
}

export const servicesOrganizationProviders = [
    getQuestionLibraryProvider
]