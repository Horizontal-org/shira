import { EntityManager } from "typeorm";
import { Question } from "src/modules/question/domain";
import { Note } from "src/modules/note/domain";

export interface TransferableImage {
  id: number;
  name: string;
  url?: string;
  buffer?: Buffer;
}

export interface ITransferTemplateImagesService {
  transferQuestionImages(
    manager: EntityManager,
    quizId: number,
    question: Question,
    images: TransferableImage[],
    referencedContent: string[],
  ): Promise<Map<number, number>>;

  transferNoteImages(
    manager: EntityManager,
    quizId: number,
    note: Note,
    images: TransferableImage[],
    referencedContent: string[],
  ): Promise<Map<number, number>>;
}
