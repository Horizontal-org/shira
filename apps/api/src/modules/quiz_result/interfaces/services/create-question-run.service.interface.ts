import { CreateQuestionRunDto } from '../../../question/dto/create-question-run.quiz';
import { QuestionRun } from '../../domain/question_runs.entity';

export interface ICreateQuestionRunService {
  execute(runId: number, dto: CreateQuestionRunDto): Promise<QuestionRun>;
}

