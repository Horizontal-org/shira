import { BulkLearnerRowResultDto } from "../../dto/learner-bulk-invite-response.dto";

export interface IInviteBulkLearnerService {
  invite(file: Express.Multer.File, spaceId: number): Promise<BulkLearnerRowResultDto[]>;
}
