import { ConfirmResetPasswordAuthDto } from '../../domain/confirm-reset-password.auth.dto';

export interface IConfirmPasswordResetAuthService {
  execute(confirmResetPasswordData: ConfirmResetPasswordAuthDto): Promise<void>;
}
