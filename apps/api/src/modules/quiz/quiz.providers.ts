import { TYPES } from './interfaces';
import { CreateQuizService } from './services/create.quiz.service';


export const createQuizServiceProvider = {
  provide: TYPES.services.ICreateQuizService,
  useClass: CreateQuizService,
};

export const servicesQuizProviders = [
  createQuizServiceProvider
];
