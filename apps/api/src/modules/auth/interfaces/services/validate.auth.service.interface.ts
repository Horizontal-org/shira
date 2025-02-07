import { LoginAuthDto } from '../../domain/login.auth.dto';
import { ReadUserDto } from '../../../user/dto';

export interface IValidateAuthService {
  execute({ email, password }: LoginAuthDto): Promise<ReadUserDto>;
}
