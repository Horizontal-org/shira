import { ResetPasswordAuthDto } from '../../domain/reset-password.auth.dto';

export interface IRequestPasswordResetAuthService {
  execute(resetPasswordData: ResetPasswordAuthDto): Promise<void>;
}
