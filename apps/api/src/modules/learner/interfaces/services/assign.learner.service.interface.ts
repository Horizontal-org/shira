import { AssignLearnerDto } from "../../dto/assign.learner.dto";

export interface IAssignLearnerService {
  assign(assignLearnerDto: AssignLearnerDto, spaceId: number): Promise<void>;
}