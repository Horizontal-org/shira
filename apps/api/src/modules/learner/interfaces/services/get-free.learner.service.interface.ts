import { GetFreeLearnersDto } from "../../dto/get-free.learner.dto";

export interface IGetFreeLearnerService {
  execute(quizId: number, spaceId: number): Promise<GetFreeLearnersDto[]>;
}