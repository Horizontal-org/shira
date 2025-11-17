import { AssignLearnerDto } from "../../dto/assign.learner.dto";

export interface IAssignLearnerService {
  assign(assignLearnerDto: AssignLearnerDto, spaceId: number): Promise<void>;
  sendEmail(email: string, spaceId: number): Promise<void>;
}