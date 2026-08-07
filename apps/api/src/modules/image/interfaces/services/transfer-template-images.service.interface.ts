import { EntityManager } from "typeorm";
import { Question } from "src/modules/question/domain";
import { CreateTemplateQuizImageDto } from "src/modules/library/dto/create-template-quiz.library.dto";

export interface ITransferTemplateImagesService {
  transferImages(
    manager: EntityManager,
    quizId: number,
    question: Question,
    images: CreateTemplateQuizImageDto[],
    referencedContent: string[],
  ): Promise<Map<number, number>>;
}
