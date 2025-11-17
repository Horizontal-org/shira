import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailSendFailedException extends HttpException {
  constructor() {
    super("learner_email_send_failed", HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: "Failed to send email invitation to learner" });
  }
}