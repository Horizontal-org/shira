import { TYPES } from './interfaces';
import { CheckPasswordUserApplication } from './applications/check-password.user.application';
// import { FindByUsernameUserApplication } from './applications/find-by-username.user.application';
// import { CreateUserService } from './services/create.user.service';
import { FindByUsernameUserService } from './services/find-by-username.user.service';
import { GetByIdUserApplication } from './applications/get-by-id.user.application';
import { FindByidUserService } from './services/find-by-id.user.service';
import { CreateUserApplication } from './applications/create.user.application';
import { CreateUserService } from './services/create.user.service';
import { MarkUserLoginService } from './services/mark.user.login.service';
import { RequestPasswordResetUserService } from './services/request-password-reset.user.service';
import { ConfirmEmailUpdateUserService } from './services/confirm-email-update.user.service';
import { ConfirmPasswordUpdateUserService } from './services/confirm-password-update.user.service';


// export const findByUsernameUserApplicationProvider = {
//   provide: TYPES.applications.IFindByUsernameUserApplication,
//   useClass: FindByUsernameUserApplication,
// };


export const createUserApplicationProvider = {
  provide: TYPES.applications.ICreateUserApplication,
  useClass: CreateUserApplication,
};

export const checkPasswordUserApplicationProvider = {
  provide: TYPES.applications.ICheckPasswordUserApplication,
  useClass: CheckPasswordUserApplication,
};


export const getByIdUserApplicationProvider = {
  provide: TYPES.applications.IGetByIdUserApplication,
  useClass: GetByIdUserApplication,
};


export const findByUernameUserServiceProvider = {
  provide: TYPES.services.IFindByUsernameUserService,
  useClass: FindByUsernameUserService,
};


export const createUserServiceProvider = {
  provide: TYPES.services.ICreateUserService,
  useClass: CreateUserService,
};


export const findByIdUserServiceProvider = {
  provide: TYPES.services.IFindByIdUserService,
  useClass: FindByidUserService,
};

export const markUserLoginServiceProvider = {
  provide: TYPES.services.IMarkUserLoginService,
  useClass: MarkUserLoginService,
};

export const requestPasswordResetUserServiceProvider = {
  provide: TYPES.services.IRequestPasswordResetUserService,
  useClass: RequestPasswordResetUserService,
};

export const confirmEmailUpdateUserServiceProvider = {
  provide: TYPES.services.IConfirmEmailUpdateUserService,
  useClass: ConfirmEmailUpdateUserService,
};

export const confirmPasswordUpdateUserServiceProvider = {
  provide: TYPES.services.IConfirmPasswordUpdateUserService,
  useClass: ConfirmPasswordUpdateUserService,
};


export const applicationsUserProviders = [
  checkPasswordUserApplicationProvider,
  getByIdUserApplicationProvider,
  createUserApplicationProvider
];

export const servicesUserProviders = [
  findByUernameUserServiceProvider,
  findByIdUserServiceProvider,
  createUserServiceProvider,
  markUserLoginServiceProvider,
  requestPasswordResetUserServiceProvider,
  confirmEmailUpdateUserServiceProvider,
  confirmPasswordUpdateUserServiceProvider
];
