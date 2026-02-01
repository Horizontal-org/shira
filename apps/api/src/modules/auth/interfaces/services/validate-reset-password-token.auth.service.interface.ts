import { EntityManager } from 'typeorm';
import { PasswordResetEntity } from '../../domain/password-reset.entity';

export interface IValidateResetPasswordTokenAuthService {
  execute(token: string, entityManager?: EntityManager): Promise<PasswordResetEntity>;
}
