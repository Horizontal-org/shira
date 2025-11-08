import { InternalServerErrorException } from "@nestjs/common";

export class EmailSendFailedException extends InternalServerErrorException {
  constructor() {
    super("Failed to send email invitation to learner");
  }
}