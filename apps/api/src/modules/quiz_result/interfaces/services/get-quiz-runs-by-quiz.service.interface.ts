import { QuizRunInfoDto } from '../../dto/quiz-run-info.dto';

export interface IGetQuizRunsByQuizService {
  execute(quizId: number): Promise<QuizRunInfoDto[]>;
}
