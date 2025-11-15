import { InternalServerErrorException } from "@nestjs/common";

export class AssignmentEmailSendFailedException extends InternalServerErrorException {
  constructor() {
    super("Failed to send quiz assignment email to learner");
  }
}