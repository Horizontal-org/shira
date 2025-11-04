import { EntityManager } from 'typeorm';
import { Question } from 'src/modules/question/domain';

export interface DuplicateQuestionParams {
  originalQuestion: Question;
  newQuestionName?: string;
  targetQuizId: number;
  appId?: number;
  languageId?: number;
  manager: EntityManager;
}

export interface DuplicatedQuestionResult {
  question: Question;
  imageIds: number[];
}

export interface ISharedQuestionDuplicationService {
  duplicateQuestion(params: DuplicateQuestionParams): Promise<DuplicatedQuestionResult>;
}