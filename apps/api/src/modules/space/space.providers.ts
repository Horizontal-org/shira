import { TYPES } from './interfaces';
import { CheckSpaceService } from './services/check.space.service';
import { CreateSpaceService } from './services/create.space.service';

export const checkSpaceServiceProvider = {
  provide: TYPES.services.ICheckSpaceService,
  useClass: CheckSpaceService,
};

export const createSpaceServiceProvider = {
  provide: TYPES.services.ICreateSpaceService,
  useClass: CreateSpaceService,
};


export const servicesSpaceProviders = [
  checkSpaceServiceProvider,
  createSpaceServiceProvider
];
