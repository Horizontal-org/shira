import { MethodNotAllowedException } from '@nestjs/common';

export class InvalidCredentailsUserException extends MethodNotAllowedException {
  constructor() {
    super(`Invalid password or username.`);
  }
}
