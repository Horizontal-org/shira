import { DuplicateQuestionQuizDto } from "../../dto/duplicate-question.quiz.dto";

export interface IDuplicateQuestionQuizService {
  execute(duplicateQuestionDto: DuplicateQuestionQuizDto, spaceId: number): Promise<void>;
}