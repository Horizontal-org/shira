import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailException extends HttpException {
  constructor(message: string, status: number, errorCode: string, details?: any) {
    super({ message, errorCode, details }, status);
  }
}

export class EmailSendFailedException extends EmailException {
  constructor() {
    super("Failed to send email invitation to learner", HttpStatus.INTERNAL_SERVER_ERROR, 'EMAIL_SEND_FAILED');
  }
}

export class EmailAlreadyTakenException extends EmailException {
  constructor(email: string) {
    super(`Email ${email} is already in use`, HttpStatus.CONFLICT, 'EMAIL_TAKEN', { email });
  }
}