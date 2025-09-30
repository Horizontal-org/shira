import { DuplicateQuestionQuizDto } from "../../dto/duplicate-question.quiz.dto";

export interface IDuplicateQuestionQuizService {
  execute(duplicateQuestionDto: DuplicateQuestionQuizDto): Promise<void>;
}