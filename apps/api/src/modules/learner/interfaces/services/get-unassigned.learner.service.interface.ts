import { GetUnassignedLearnersDto } from "../../dto/get-unassigned.learner.dto";

export interface IGetUnassignedLearnerService {
  execute(quizId: number, spaceId: number): Promise<GetUnassignedLearnersDto[]>;
}