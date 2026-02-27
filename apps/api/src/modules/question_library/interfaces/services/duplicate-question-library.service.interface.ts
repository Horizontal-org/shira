import { DuplicateQuestionLibraryDto } from "../../dto/duplicate-question-library.dto";

export interface IDuplicateLibraryQuestionService {
  execute(questionId: string, dto: DuplicateQuestionLibraryDto): Promise<void>;
}
