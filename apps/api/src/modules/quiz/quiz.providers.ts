import { TYPES } from './interfaces';
import { CreateQuizService } from './services/create.quiz.service';
import { DeleteQuizService } from './services/delete.quiz.service';
import { EditQuizService } from './services/edit.quiz.service';
import { GetByHashQuizService } from './services/get-by-hash.quiz.service';
import { GetByIdQuizService } from './services/get-by-id.quiz.service';
import { ListQuizService } from './services/list.quiz.service';

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

export const servicesQuizProviders = [
  createQuizServiceProvider,
  listQuizServiceProvider,
  editQuizServiceProvider,
  deleteQuizServiceProvider,
  getByIdQuizServiceProvider,
  getByHashQuizServiceProvider
];
