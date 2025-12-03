import { InvitationBulkLearnerDto } from "../../dto/invitation-bulk.learner.dto";
import { LearnerOperationResponse } from "../../dto/learner-operation-response.dto";

export interface IInviteBulkLearnerService {
  invite(dto: InvitationBulkLearnerDto, spaceId: number): Promise<LearnerOperationResponse[]>;
}