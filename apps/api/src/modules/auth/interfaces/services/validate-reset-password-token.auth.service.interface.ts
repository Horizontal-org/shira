import { PasswordResetEntity } from '../../domain/password-reset.entity';

export interface IValidateResetPasswordTokenAuthService {
  execute(token: string): Promise<PasswordResetEntity>;
}
