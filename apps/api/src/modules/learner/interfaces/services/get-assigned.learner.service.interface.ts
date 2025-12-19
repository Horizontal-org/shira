import { GetLearnersQuizzesDto } from "../../dto/get.learner-quiz.dto";

export interface IGetAssignedLearnerService {
  execute(quizId: number): Promise<GetLearnersQuizzesDto[]>;
}