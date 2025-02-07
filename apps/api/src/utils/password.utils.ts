import { hash, compare } from 'bcrypt';
import { BCRYPT_SALT } from './environment/bcrypt-salt.environment';

export const hashPassword = async (password: string) => {
  return await hash(password, BCRYPT_SALT);
};

export const comparePassword = async (password: string, hash: string) => {
  return await compare(password, hash);
};
