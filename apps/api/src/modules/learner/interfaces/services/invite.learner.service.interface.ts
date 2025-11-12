import { InviteLearnerDto } from "../../dto/invitation.learner.dto";
import { InviteLearnerResponseDto } from "../../dto/invitation-response.learner.dto";

export interface IInviteLearnerService {
  invite(dto: InviteLearnerDto): Promise<InviteLearnerResponseDto>;
  sendEmail(email: string, spaceId: number, rawToken: string): Promise<void>;
  accept(token: string): Promise<void>;
}