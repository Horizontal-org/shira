import { CreateQuestionRunDto } from '../../dto/create-question-run.quiz';
import { QuestionRun } from '../../domain/question_runs.entity';

export interface ICreateQuestionRunService {
  execute(runId: number, token: string | undefined, dto: CreateQuestionRunDto): Promise<QuestionRun>;
}
