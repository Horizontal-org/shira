import { InviteLearnerDto } from "../../dto/invitation.learner.dto";
import { InviteLearnerResponseDto } from "../../dto/invitation-response.learner.dto";

export interface IInviteLearnerService {
  invite(dto: InviteLearnerDto, spaceId: number): Promise<InviteLearnerResponseDto>;
  sendEmail(email: string, spaceId: number, hash: string): Promise<void>;
  accept(token: string): Promise<string>;
}