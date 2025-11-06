import { AssignLearnerDto } from "../../dto/assign.learner.dto";

export interface IAssignLearnerService {
    execute(assignLearnerDto: AssignLearnerDto): Promise<void>;
}