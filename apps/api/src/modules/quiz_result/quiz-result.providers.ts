import { TYPES } from './interfaces';
import { GetResultQuizService } from '../quiz_result/services/get-result.quiz.service';
import { StartQuizRunService } from './services/start-quiz-run.service';
import { FinishQuizRunService } from './services/finish-quiz-run.service';
import { CreateQuestionRunService } from '../quiz_result/services/create-question-run.service';
import { GetQuizRunsByQuizService } from './services/get-quiz-runs-by-quiz.service';

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

export const createQuestionRunServiceProvider = {
  provide: TYPES.services.ICreateQuestionRunService,
  useClass: CreateQuestionRunService,
}

export const getQuizRunsByQuizServiceProvider = {
  provide: TYPES.services.IGetQuizRunsByQuizService,
  useClass: GetQuizRunsByQuizService,
}

export const servicesQuizProviders = [
  getResultQuizServiceProvider,
  startQuizRunServiceProvider,
  finishQuizRunServiceProvider,
  createQuestionRunServiceProvider,
  getQuizRunsByQuizServiceProvider,
];
