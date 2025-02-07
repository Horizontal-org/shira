import { ConflictException } from '@nestjs/common';

export class AlreadyExistUserException extends ConflictException {
  constructor(username: string) {
    const message = `User ${username} already exist`;
    super(message);
  }
}
