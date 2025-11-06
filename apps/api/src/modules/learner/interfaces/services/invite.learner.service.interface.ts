import { InviteLearnerDto } from "../../dto/invitation.learner.dto";

export interface IInviteLearnerService {
    sendInvitationEmail(email: string): Promise<void>;
    invite(inviteLearnerDto: InviteLearnerDto): Promise<void>;
}