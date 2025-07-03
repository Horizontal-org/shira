import { TYPES } from "./interfaces";
import { CreateQuestionImageService } from "./services/create.question_image.service";
import { GenerateUrlsQuestionImageService } from "./services/generate_urls.question_image.service";
import { SyncQuestionImageService } from "./services/sync.question_image.service";

export const createQuestionImageServiceProvider = {
  provide: TYPES.services.ICreateQuestionImageService,
  useClass: CreateQuestionImageService,
};

export const syncQuestionImageServiceProvider = {
  provide: TYPES.services.ISyncQuestionImageService,
  useClass: SyncQuestionImageService,
};

export const generateUrlsQuestionImageService = {
  provide: TYPES.services.IGenerateUrlsQuestionImageService,
  useClass: GenerateUrlsQuestionImageService
}

export const servicesQuestionImageProviders = [
  createQuestionImageServiceProvider,
  syncQuestionImageServiceProvider,
  generateUrlsQuestionImageService
];
