import { QuestionLibraryDto } from "../../dto/question.library.dto";

export interface IGetLibraryQuestionService {
  execute(): Promise<QuestionLibraryDto[]>;
}