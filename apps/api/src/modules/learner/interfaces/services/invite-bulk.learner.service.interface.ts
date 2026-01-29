import { BulkLearnerRowResultDto } from "../../dto/learner-bulk-invite-response.dto";

export interface IInviteBulkLearnerService {
  verify(file: Express.Multer.File, spaceId: number): Promise<BulkLearnerRowResultDto[]>;
  invite(file: Express.Multer.File, spaceId: number): Promise<BulkLearnerRowResultDto[]>;
}
