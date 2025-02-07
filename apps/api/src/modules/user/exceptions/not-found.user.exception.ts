import { NotFoundException } from '@nestjs/common';

export class NotFoundUserException extends NotFoundException {
  constructor() {
    const message = `User not found`;
    super(message);
  }
}
