import { SyncQuestionImageDto } from "../../dto/sync.question_image.dto";

export interface ISyncQuestionImageService {
  execute(syncQuestionImages: SyncQuestionImageDto): Promise<void>;
}
