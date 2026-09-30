import { InviteLearnerDto } from "../../dto/invitation.learner.dto";

export interface IInviteLearnerService {
  invite(dto: InviteLearnerDto, spaceId: number): Promise<void>;
  preview(token: string): Promise<string>;
  accept(token: string): Promise<string>;
}