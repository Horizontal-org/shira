import { BadRequestException } from '@nestjs/common';

export class InvalidTitleException extends BadRequestException {
  constructor() {
    super(`Invalid title.`);
  }
}
