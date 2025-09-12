import { TYPES } from './interfaces';
import { GetResultQuizService } from '../quiz_result/services/get-result.quiz.service';
import { StartQuizRunService } from './services/start-quiz-run.service';
import { FinishQuizRunService } from './services/finish-quiz-run.service';
import { createQuestionRunServiceProvider } from '../quiz/quiz.providers';

export const getResultQuizServiceProvider = {
  provide: TYPES.services.IGetResultQuizService,
  useClass: GetResultQuizService
}

export const startQuizRunServiceProvider = {
  provide: TYPES.services.IStartQuizRunService,
  useClass: StartQuizRunService
}

export const finishQuizRunServiceProvider = {
  provide: TYPES.services.IFinishQuizRunService,
  useClass: FinishQuizRunService
}

export const servicesQuizProviders = [
  getResultQuizServiceProvider,
  startQuizRunServiceProvider,
  finishQuizRunServiceProvider,
  createQuestionRunServiceProvider
];
