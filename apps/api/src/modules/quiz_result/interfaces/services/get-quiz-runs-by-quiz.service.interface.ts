import { QuizRun } from '../../domain/quiz_runs.entity';

export interface IGetQuizRunsByQuizService {
  execute(quizId: number): Promise<QuizRun[]>;
}
