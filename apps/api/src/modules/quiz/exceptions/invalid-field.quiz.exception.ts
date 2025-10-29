import { BadRequestException } from '@nestjs/common';

export class InvalidFieldException extends BadRequestException {
  constructor(field?: string) {
    const baseMessage = field
      ? `Invalid value for field "${field}".`
      : 'Invalid field.';
    super(baseMessage);
  }
}
