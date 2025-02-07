import { ReadUserDto } from '../../../user/dto';
import { JWTResponse } from '../../domain';

export interface IGenerateTokenAuthService {
  execute(user: ReadUserDto): Promise<JWTResponse>;
}
