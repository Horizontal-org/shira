import { ResetPasswordAuthDto } from "src/modules/auth/domain/reset-password.auth.dto";

export interface IRequestPasswordResetUserService {
  execute(resetPasswordData: ResetPasswordAuthDto): Promise<void>;
}
