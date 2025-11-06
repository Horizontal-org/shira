import { InviteLearnerDto } from "../../dto/invitation.learner.dto";

export interface IInviteLearnerService {
    execute(inviteLearnerDto: InviteLearnerDto): Promise<void>;
}