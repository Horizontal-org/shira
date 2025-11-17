import { InternalServerErrorException } from "@nestjs/common";

export class AssignToQuizException extends InternalServerErrorException {
  constructor() {
    super("Failed to assign learner to quiz");
  }
}