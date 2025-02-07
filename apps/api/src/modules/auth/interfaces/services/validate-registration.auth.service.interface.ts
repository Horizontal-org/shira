import { RegisterAuthDto } from '../../domain/register.auth.dto';

export interface IValidateRegistrationAuthService {
  execute(registrationData: RegisterAuthDto): Promise<boolean>;
}
