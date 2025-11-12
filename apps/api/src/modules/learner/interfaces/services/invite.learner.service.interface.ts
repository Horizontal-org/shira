import { InviteEmailLearnerDto } from "../../dto/invitation-email.learner.dto";
import { InviteLearnerDto } from "../../dto/invitation.learner.dto";

export interface IInviteLearnerService {
  sendEmail(dto: InviteEmailLearnerDto): Promise<void>;
  invite(dto: InviteLearnerDto): Promise<void>;
  accept(token: string): Promise<void>;
}