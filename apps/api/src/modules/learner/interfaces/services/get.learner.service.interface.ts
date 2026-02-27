import { GetLearnersDto } from "../../dto/get-learner.dto";

export interface IGetLearnerService {
  execute(spaceId: number): Promise<GetLearnersDto[]>;
}