import { TYPES } from './interfaces';
import { CreateQuestionQuizService } from './services/create-question.quiz.service';
import { CreateQuizService } from '../quiz_result/services/create.quiz.service';
import { DeleteQuestionQuizService } from './services/delete-question.quiz.service';
import { DeleteQuizService } from './services/delete.quiz.service';
import { EditQuestionQuizService } from './services/edit-question.quiz.service';
import { EditQuizService } from './services/edit.quiz.service';
import { GetByHashQuizService } from './services/get-by-hash.quiz.service';
import { GetByIdQuizService } from './services/get-by-id.quiz.service';
import { ListQuizService } from './services/list.quiz.service';
import { ReorderQuestionQuizService } from './services/reorder-question.quiz.service';
import { ValidateSpaceQuizService } from './services/validate-space.quiz.service';

export const createQuizServiceProvider = {
  provide: TYPES.services.ICreateQuizService,
  useClass: CreateQuizService,
};

export const listQuizServiceProvider = {
  provide: TYPES.services.IListQuizService,
  useClass: ListQuizService,
};

export const editQuizServiceProvider = {
  provide: TYPES.services.IEditQuizService,
  useClass: EditQuizService,
};

export const deleteQuizServiceProvider = {
  provide: TYPES.services.IDeleteQuizService,
  useClass: DeleteQuizService
}

export const getByIdQuizServiceProvider = {
  provide: TYPES.services.IGetByIdQuizService,
  useClass: GetByIdQuizService
}

export const getByHashQuizServiceProvider = {
  provide: TYPES.services.IGetByHashQuizService,
  useClass: GetByHashQuizService
}

export const createQuizQuestionServiceProvider = {
  provide: TYPES.services.ICreateQuestionQuizService,
  useClass: CreateQuestionQuizService
}

export const editQuizQuestionServiceProvider = {
  provide: TYPES.services.IEditQuestionQuizService,
  useClass: EditQuestionQuizService
}

export const validateSpaceQuizServiceProvider = {
  provide: TYPES.services.IValidateSpaceQuizService,
  useClass: ValidateSpaceQuizService
}

export const deleteQuestionQuizServiceProvider = {
  provide: TYPES.services.IDeleteQuestionQuizService,
  useClass: DeleteQuestionQuizService
}

export const reorderQuestionQuizServiceProvider = {
  provide: TYPES.services.IReorderQuestionQuizService,
  useClass: ReorderQuestionQuizService
}

export const createQuestionQuizServiceProvider = {
  provide: TYPES.services.ICreateQuestionQuizService,
  useClass: CreateQuestionQuizService
}

export const servicesQuizProviders = [
  createQuizServiceProvider,
  listQuizServiceProvider,
  editQuizServiceProvider,
  deleteQuizServiceProvider,
  getByIdQuizServiceProvider,
  getByHashQuizServiceProvider,
  createQuizQuestionServiceProvider,
  editQuizQuestionServiceProvider,
  validateSpaceQuizServiceProvider,
  deleteQuestionQuizServiceProvider,
  reorderQuestionQuizServiceProvider
];
