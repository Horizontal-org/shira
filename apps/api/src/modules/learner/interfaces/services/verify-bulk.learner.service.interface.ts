import { BulkLearnerRowResultDto } from "../../dto/learner-bulk-invite-response.dto";

export interface IVerifyBulkLearnerService {
  verify(file: Express.Multer.File, spaceId: number): Promise<BulkLearnerRowResultDto[]>;
}
