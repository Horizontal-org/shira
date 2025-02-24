import { TYPES } from './interfaces';
import { CheckSpaceService } from './services/check.space.service';
import { CreateSpaceService } from './services/create.space.service';
import { ValidateHeaderSpaceService } from './services/validate-header.space.service';

export const checkSpaceServiceProvider = {
  provide: TYPES.services.ICheckSpaceService,
  useClass: CheckSpaceService,
};

export const createSpaceServiceProvider = {
  provide: TYPES.services.ICreateSpaceService,
  useClass: CreateSpaceService,
};

export const validateHeaderSpaceServiceProvider = {
  provide: TYPES.services.IValidateHeaderSpaceService,
  useClass: ValidateHeaderSpaceService,
};

export const servicesSpaceProviders = [
  checkSpaceServiceProvider,
  createSpaceServiceProvider,
  validateHeaderSpaceServiceProvider
];
