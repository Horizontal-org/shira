import { LearnerQuiz } from "../../domain/learners_quizzes.entity";

export interface IValidateLearnerQuizService {
  execute(quizId: number, learnerId: number): Promise<LearnerQuiz>;
}