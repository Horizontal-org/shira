import { AssignLearnerDto } from "../../dto/assign.learner.dto";

export interface IAssignLearnerService {
  assign(assignLearnerDto: AssignLearnerDto): Promise<void>;
}