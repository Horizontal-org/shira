import { TYPES } from './interfaces';
import { CreateQuizService } from './services/create.quiz.service';
import { ListQuizService } from './services/list.quiz.service';

export const createQuizServiceProvider = {
  provide: TYPES.services.ICreateQuizService,
  useClass: CreateQuizService,
};

export const listQuizServiceProvider = {
  provide: TYPES.services.IListQuizService,
  useClass: ListQuizService,
};

export const servicesQuizProviders = [
  createQuizServiceProvider,
  listQuizServiceProvider
];
