import { HttpException, HttpStatus } from "@nestjs/common";

export class AssignToQuizException extends HttpException {
  constructor() {
    super("learner_assignment_failed", HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: "Failed to assign learner to quiz" });
  }
}