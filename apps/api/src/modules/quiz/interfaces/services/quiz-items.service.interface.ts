import { EntityManager } from "typeorm";
import { QuizItem, QuizItemEntityType } from "../../domain/quiz_items.entity";
import { Question } from "src/modules/question/domain";
import { Note } from "../../../note/domain";

export type HydratedQuizItem = QuizItem & {
  question?: Question;
  note?: Note;
};

export interface ReorderQuizItemInput {
  position: number;
  entityType: QuizItemEntityType;
  entityId: number;
}

export interface IQuizItemsService {
  append(
    quizId: number,
    entityType: QuizItemEntityType,
    entityId: number,
    manager?: EntityManager,
  ): Promise<QuizItem>;

  removeAndResequence(
    quizId: number,
    quizItemId: number,
    manager?: EntityManager,
  ): Promise<QuizItem>;

  insertAfter(
    quizId: number,
    afterQuizItemId: number,
    entityType: QuizItemEntityType,
    entityId: number,
    manager?: EntityManager,
  ): Promise<QuizItem>;

  reorder(
    quizId: number,
    newOrder: ReorderQuizItemInput[],
    manager?: EntityManager,
  ): Promise<void>;

  hydrate(
    items: QuizItem[],
    options?: { questionRelations?: string[]; noteRelations?: string[] },
  ): Promise<HydratedQuizItem[]>;
}
