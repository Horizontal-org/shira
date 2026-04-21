import { TYPES } from './interfaces';
import { ValidateAuthService, GenerateTokenAuthService } from './services';
import { ValidateRegistrationAuthService } from './services/validate-registration.auth.service';
import { SendInvitationAuthService } from './services/send-invitation.auth.service'
import { SpaceRegistrationAuthService } from './services/space-registration.auth.service';
import { UserContextService } from './services/user-context.service';
import { RequestPasswordResetAuthService } from './services/request-password-reset.auth.service';
import { ConfirmResetPasswordAuthService } from './services/confirm-reset-password.auth.service';
import { ValidateResetPasswordTokenAuthService } from './services/validate-reset-password-token.auth.service';

export const generateTokenAuthServiceProvider = {
  provide: TYPES.services.IGenerateTokenAuthService,
  useClass: GenerateTokenAuthService,
};

export const validateAuthServiceProvider = {
  provide: TYPES.services.IValidateAuthService,
  useClass: ValidateAuthService,
};

export const validateRegistrationAuthServiceProvider = {
  provide: TYPES.services.IValidateRegistrationAuthService,
  useClass: ValidateRegistrationAuthService,
};

export const sendInvitationAuthServiceProvider = {
  provide: TYPES.services.ISendInvitationAuthService,
  useClass: SendInvitationAuthService
}

export const spaceRegistrationAuthServiceProvider = {
  provide: TYPES.services.ISpaceRegistrationAuthService,
  useClass: SpaceRegistrationAuthService,
};

export const requestPasswordResetAuthServiceProvider = {
  provide: TYPES.services.IRequestPasswordResetAuthService,
  useClass: RequestPasswordResetAuthService,
};

export const confirmPasswordResetAuthServiceProvider = {
  provide: TYPES.services.IConfirmPasswordResetAuthService,
  useClass: ConfirmResetPasswordAuthService,
};

export const validatePasswordResetTokenAuthServiceProvider = {
  provide: TYPES.services.IValidateResetPasswordTokenAuthService,
  useClass: ValidateResetPasswordTokenAuthService,
};

const userContextServiceProvider = {
  provide: TYPES.services.IUserContextService,
  useClass: UserContextService,
};
export const handlersAuthProviders = [];

export const applicationsAuthProviders = [];

export const servicesAuthProviders = [
  generateTokenAuthServiceProvider,
  validateAuthServiceProvider,
  validateRegistrationAuthServiceProvider,
  sendInvitationAuthServiceProvider,
  spaceRegistrationAuthServiceProvider,
  requestPasswordResetAuthServiceProvider,
  confirmPasswordResetAuthServiceProvider,
  validatePasswordResetTokenAuthServiceProvider,
  userContextServiceProvider,
];
