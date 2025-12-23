import { HttpException, HttpStatus } from "@nestjs/common";
import { PassphraseErrorCodes } from "./errors/passphrase.error-codes";

export class GenericPassphraseErrorException extends HttpException {
  constructor() {
    super(PassphraseErrorCodes.ErrorMessage, HttpStatus.NOT_FOUND);
  }
}