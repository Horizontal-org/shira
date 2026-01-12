import { LearnerOperationResponse } from "../../dto/learner-operation-response.dto";

export interface IInviteBulkLearnerService {
  invite(file: Express.Multer.File, spaceId: number): Promise<LearnerOperationResponse[]>;
}
