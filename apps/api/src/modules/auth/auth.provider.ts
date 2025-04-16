import { TYPES } from './interfaces';
import { ValidateAuthService, GenerateTokenAuthService } from './services';
import { ConfirmRegistrationAuthService } from './services/confirm-registration.auth.service';
import { SubmitRegistrationAuthService } from './services/submit-registration.auth.service';
import { ValidateRegistrationAuthService } from './services/validate-registration.auth.service';
import { SendInvitationAuthService } from './services/send-invitation.auth.service'
import { SpaceRegistrationAuthService } from './services/space-registration.auth.service';

export const generateTokenAuthServiceProvider = {
  provide: TYPES.services.IGenerateTokenAuthService,
  useClass: GenerateTokenAuthService,
};

export const validateAuthServiceProvider = {
  provide: TYPES.services.IValidateAuthService,
  useClass: ValidateAuthService,
};

export const submitRegistrationAuthServiceProvider = {
  provide: TYPES.services.ISubmitRegistrationAuthService,
  useClass: SubmitRegistrationAuthService,
};

export const validateRegistrationAuthServiceProvider = {
  provide: TYPES.services.IValidateRegistrationAuthService,
  useClass: ValidateRegistrationAuthService,
};

export const confirmRegistrationAuthServiceProvider = {
  provide: TYPES.services.IConfirmRegistrationAuthService,
  useClass: ConfirmRegistrationAuthService,
};

export const sendInvitationAuthServiceProvider= {
  provide: TYPES.services.ISendInvitationAuthService,
  useClass: SendInvitationAuthService
}

export const spaceRegistrationAuthServiceProvider = {
  provide: TYPES.services.ISpaceRegistrationAuthService,
  useClass: SpaceRegistrationAuthService,
};

export const handlersAuthProviders = [];

export const applicationsAuthProviders = [];

export const servicesAuthProviders = [
  generateTokenAuthServiceProvider,
  validateAuthServiceProvider,
  submitRegistrationAuthServiceProvider,
  validateRegistrationAuthServiceProvider,
  confirmRegistrationAuthServiceProvider,
  sendInvitationAuthServiceProvider,
  spaceRegistrationAuthServiceProvider
];
