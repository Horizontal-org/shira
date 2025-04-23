import { TYPES } from './interfaces';
import { CheckSpaceService } from './services/check.space.service';
import { CreateSpaceService } from './services/create.space.service';
import { ValidateHeaderSpaceService } from './services/validate-header.space.service';
import { AssociateUserSpaceService } from './services/associate-user.space.service';
import { DeleteSpaceService } from './services/delete.space.service'
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

export const associateUserSpaceServiceProvider = {
  provide: TYPES.services.IAssociateUserSpaceService,
  useClass: AssociateUserSpaceService
}

export const deleteSpaceServiceProvider = {
  provide: TYPES.services.IDeleteSpaceService,
  useClass: DeleteSpaceService,
};

export const servicesSpaceProviders = [
  checkSpaceServiceProvider,
  createSpaceServiceProvider,
  validateHeaderSpaceServiceProvider,
  associateUserSpaceServiceProvider,
  deleteSpaceServiceProvider
];
