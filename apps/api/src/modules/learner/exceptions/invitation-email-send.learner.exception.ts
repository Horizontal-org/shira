import { InternalServerErrorException } from "@nestjs/common";

export class InvitationEmailSendFailedException extends InternalServerErrorException {
    constructor() {
        super("Failed to send invitation email to learner");
    }
}