import { TYPES } from './interfaces';
import { GetResultQuizService } from '../quiz_result/services/get-result.quiz.service';

export const getResultQuizServiceProvider = {
  provide: TYPES.services.IGetResultQuizService,
  useClass: GetResultQuizService
}

export const servicesQuizProviders = [
  getResultQuizServiceProvider
];
