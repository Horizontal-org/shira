import { FinishQuizRunDto } from '../../dto/finish-quiz-run.dto';
import { QuizRuns } from '../../domain/quiz_runs.entity';

export interface IFinishQuizRunService {
  execute(runId: number, dto: FinishQuizRunDto): Promise<QuizRuns>;
}
