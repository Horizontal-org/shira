import { UserEntity } from '../../domain/user.entity';
import { CreateUserDto } from '../../dto';

export interface ICreateUserService {
  execute(createUserDto: CreateUserDto): Promise<UserEntity>;
}
