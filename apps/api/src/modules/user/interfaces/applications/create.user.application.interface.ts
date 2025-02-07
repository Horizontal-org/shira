import { UserEntity } from '../../domain/user.entity';
import { CreateUserDto } from '../../dto';

export interface ICreateUserApplication {
  execute(createUserDto: CreateUserDto): Promise<UserEntity>;
}
