import { LoginAuthController } from './login.auth.controller';
import { InviteAuthController } from './invite.auth.controller';
import { SpaceRegistrationAuthController } from './space-registration.auth.controller'
import { ResetPasswordAuthController } from './reset-password.auth.controller';
import { LogoutAuthController } from './logout.auth.controller';
export const authControllers = [
    LoginAuthController,
    InviteAuthController,
    SpaceRegistrationAuthController,
    ResetPasswordAuthController,
    LogoutAuthController,
];
