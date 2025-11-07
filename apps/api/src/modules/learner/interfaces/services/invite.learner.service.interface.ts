import { InviteEmailLearnerDto } from "../../dto/invitation-email.learner.dto";
import { InviteLearnerDto } from "../../dto/invitation.learner.dto";

export interface IInviteLearnerService {
  sendInvitationEmail(dto: InviteEmailLearnerDto): Promise<void>;
  invite(dto: InviteLearnerDto): Promise<void>;
}