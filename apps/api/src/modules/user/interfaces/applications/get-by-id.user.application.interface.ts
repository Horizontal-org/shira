import { ReadUserDto } from '../../dto';

export interface IGetByIdUserApplication {
  execute(userId: number): Promise<ReadUserDto>;
}
