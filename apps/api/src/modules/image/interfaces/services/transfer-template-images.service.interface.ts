import { EntityManager } from "typeorm";
import { Question } from "src/modules/question/domain";

export interface TransferableImage {
  id: number;
  name: string;
  url?: string;
  buffer?: Buffer;
}

export interface ITransferTemplateImagesService {
  transferImages(
    manager: EntityManager,
    quizId: number,
    question: Question,
    images: TransferableImage[],
    referencedContent: string[],
  ): Promise<Map<number, number>>;
}
