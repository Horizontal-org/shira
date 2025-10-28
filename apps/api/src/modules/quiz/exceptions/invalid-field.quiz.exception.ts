import { BadRequestException } from '@nestjs/common';

export class InvalidFieldException extends BadRequestException {
  constructor(field?: string, customMessage?: string) {
    const baseMessage = field 
      ? `Invalid value for field "${field}".`
      : 'Invalid field.';
    super(customMessage ?? baseMessage);
  }
}
