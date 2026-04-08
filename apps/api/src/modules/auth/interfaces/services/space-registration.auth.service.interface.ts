import { RegisterAuthDto } from '../../domain/register.auth.dto'
import { SpaceRegistrationResponse } from '../../domain/space-registration-response.auth.dto'

export interface ISpaceRegistrationAuthService {
    execute(registrationData: RegisterAuthDto): Promise<SpaceRegistrationResponse>
}
