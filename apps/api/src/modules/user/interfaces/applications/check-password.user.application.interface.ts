import { ReadUserDto, CredentialUserDto } from '../../dto';

export interface ICheckPasswordUserApplication {
  execute(credentialUserDto: CredentialUserDto): Promise<ReadUserDto>;
}
