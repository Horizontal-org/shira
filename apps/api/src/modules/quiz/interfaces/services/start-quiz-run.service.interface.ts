import { StartQuizRunDto } from '../../dto/start-quiz-run.dto';
import { QuizRuns } from '../../domain/quiz_runs.entity';

export interface IStartQuizRunService {
  execute(dto: StartQuizRunDto): Promise<QuizRuns>;
}
