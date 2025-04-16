import { RegisterAuthDto } from '../../domain/register.auth.dto'

export interface ISpaceRegistrationAuthService {
    execute(registrationData: RegisterAuthDto): Promise<void>
}
