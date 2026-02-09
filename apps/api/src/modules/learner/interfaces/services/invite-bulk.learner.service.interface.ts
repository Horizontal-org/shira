import { BulkLearnerRowResultDto } from "../../dto/learner-bulk-invite-response.dto";
import { BulkInviteValidatedLearnerDto } from "../../dto/learner-bulk-invite-request.dto";

export interface IInviteBulkLearnerService {
  invite(learners: BulkInviteValidatedLearnerDto[], spaceId: number): Promise<BulkLearnerRowResultDto[]>;
}
