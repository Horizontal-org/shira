import { AssignLearnerDto } from "../../dto/assign.learner.dto";
import { LearnerOperationResponse } from "../../dto/learner-operation-response.dto";

export interface IAssignLearnerService {
  assign(assignLearnerDto: AssignLearnerDto, spaceId: number): Promise<LearnerOperationResponse[]>;
}