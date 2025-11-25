import { DeleteLearnerDto } from "../../dto/delete.learner.dto";

export interface IDeleteLearnerService {
  delete(deleteLearnerDto: DeleteLearnerDto, spaceId: number): Promise<void>;
}