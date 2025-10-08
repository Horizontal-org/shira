import { QuizRunInfoDto } from '../../dto/quiz-run-info.dto';

export interface IGetQuizRunsService {
  getAllBySpaceId(spaceId: number): Promise<QuizRunInfoDto[]>;
  getLatestBySpaceId(spaceId: number): Promise<QuizRunInfoDto>;
}
