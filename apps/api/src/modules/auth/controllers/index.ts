import { ConfirmAuthController } from './confirm.auth.controller';
import { LoginAuthController } from './login.auth.controller';
import { RegisterAuthController } from './registration.auth.controller';
import { InviteAuthController } from './invite.auth.controller';
import { SpaceRegistrationAuthController } from './space-registration.auth.controller'
import { ResetPasswordAuthController } from './reset-password.auth.controller';
export const authControllers = [
    LoginAuthController,
    RegisterAuthController,
    ConfirmAuthController,
    InviteAuthController,
    SpaceRegistrationAuthController,
    ResetPasswordAuthController,
];
