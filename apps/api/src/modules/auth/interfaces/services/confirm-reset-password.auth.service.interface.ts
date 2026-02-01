import { ConfirmResetPasswordAuthDto } from '../../domain/confirm-reset-password.auth.dto';

export interface IConfirmPasswordResetAuthService {
  execute(dto: ConfirmResetPasswordAuthDto, token: string): Promise<void>;
}
