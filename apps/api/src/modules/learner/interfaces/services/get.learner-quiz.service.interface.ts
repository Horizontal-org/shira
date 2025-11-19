import { GetByHashLearnerQuizDto } from "../../dto/get-by-hash.learner-quiz.dto";

export interface IGetLearnerQuizService {
  execute(hash: string): Promise<GetByHashLearnerQuizDto>;
}