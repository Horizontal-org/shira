import { UserEntity } from '../../domain/user.entity';

export interface IFindByIdUserService {
  execute(userId: number): Promise<UserEntity>;
}
