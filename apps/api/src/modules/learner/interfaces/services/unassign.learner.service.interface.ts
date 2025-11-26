import { LearnerOperationResponse } from "../../dto/learner-operation-response.dto";
import { UnassignLearnerDto } from "../../dto/unassign.learner.dto";

export interface IUnassignLearnerService {
  unassign(unassignLearnerDto: UnassignLearnerDto, spaceId: number): Promise<LearnerOperationResponse[]>;
}
