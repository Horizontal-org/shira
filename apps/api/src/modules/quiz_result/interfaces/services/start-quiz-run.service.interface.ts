import { StartQuizRunDto } from '../../dto/start-quiz-run.dto';
import { QuizRun } from '../../domain/quiz_runs.entity';

export type StartedQuizRun = Pick<QuizRun, 'id' | 'quizId' | 'learnerId' | 'startedAt'> & { token: string };

export interface IStartQuizRunService {
  execute(dto: StartQuizRunDto): Promise<StartedQuizRun>;
}
