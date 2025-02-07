import { RegisterAuthDto } from '../../domain/register.auth.dto';

export interface ISubmitRegistrationAuthService {
  execute(registrationData: RegisterAuthDto): Promise<void>;
}
