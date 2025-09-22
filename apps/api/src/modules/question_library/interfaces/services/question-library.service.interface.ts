import { Question } from 'src/modules/question/domain';

export interface IGetLibraryQuestionService {
  execute(): Promise<Question[]>;
}