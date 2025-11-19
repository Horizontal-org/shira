import { InviteLearnerDto } from "../../dto/invitation.learner.dto";

export interface IInviteLearnerService {
  invite(dto: InviteLearnerDto, spaceId: number): Promise<void>;
  accept(token: string): Promise<string>;
}