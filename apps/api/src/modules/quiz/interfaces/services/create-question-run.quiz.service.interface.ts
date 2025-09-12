import { CreateQuestionRunDto } from '../../dto/create-question-run.dto';
import { QuestionRun } from '../../domain/question_runs.entity';

export interface ICreateQuestionRunService {
  execute(runId: number, dto: CreateQuestionRunDto): Promise<QuestionRun>;
}
