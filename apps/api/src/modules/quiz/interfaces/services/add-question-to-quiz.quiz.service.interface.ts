import { EntityManager } from "typeorm";
import { TransferableImage } from "src/modules/image/interfaces/services/transfer-template-images.service.interface";

export interface AddQuestionToQuizParams {
  quizId: number;
  name: string;
  content: string;
  isPhishing: boolean;
  app: { id: number } | { name: string };
  isFromTemplate: boolean;
  images?: TransferableImage[];
  explanations?: { position: string; index: string; text: string }[];
}

export interface IAddQuestionToQuizService {
  execute(params: AddQuestionToQuizParams, manager?: EntityManager): Promise<number>;
}
