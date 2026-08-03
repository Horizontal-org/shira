import { EntityManager } from "typeorm";

export interface AddQuestionToQuizParams {
  quizId: number;
  name: string;
  content: string;
  isPhishing: boolean;
  app: { id: number } | { name: string };
  isFromTemplate: boolean;
  images?: { id: number; name: string; url: string }[];
  explanations?: { position: string; index: string; text: string }[];
}

export interface IAddQuestionToQuizService {
  execute(params: AddQuestionToQuizParams, manager?: EntityManager): Promise<number>;
}
