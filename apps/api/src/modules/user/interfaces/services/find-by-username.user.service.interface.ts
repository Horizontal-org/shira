import { UserEntity } from '../../domain/user.entity';

export interface IFindByUsernameUserService {
  execute(username: string): Promise<UserEntity>;
}
