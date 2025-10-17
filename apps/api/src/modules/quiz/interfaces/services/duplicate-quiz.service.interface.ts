import { DuplicateQuizDto } from "../../dto/duplicate-quiz.dto";
import { Quiz } from "../../domain/quiz.entity";

export interface IDuplicateQuizService {
  execute(duplicateQuizDto: DuplicateQuizDto): Promise<Quiz>;
}