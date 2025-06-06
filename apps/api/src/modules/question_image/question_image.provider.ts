import { TYPES } from "./interfaces";
import { CreateQuestionImageService } from "./services/create.question_image.service";


export const createQuestionImageServiceProvider = {
  provide: TYPES.services.ICreateQuestionImageService,
  useClass: CreateQuestionImageService,
};


export const servicesQuestionImageProviders = [
  createQuestionImageServiceProvider
];
