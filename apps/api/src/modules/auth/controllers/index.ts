import { ConfirmRegistrationAuthService } from '../services/confirm-registration.auth.service';
import { ConfirmAuthController } from './confirm.auth.controller';
import { LoginAuthController } from './login.auth.controller';
import { RegisterAuthController } from './registration.auth.controller';

export const authControllers = [
    LoginAuthController,
    RegisterAuthController,
    ConfirmAuthController
];
