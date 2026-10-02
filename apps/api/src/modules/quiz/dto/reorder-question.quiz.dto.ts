import { IsArray, IsNumber } from "class-validator";
import { QuizItemEntityType } from "../domain/quiz_items.entity";

export class ReorderQuestionQuizDto {

  @IsNumber()
  quizId: number;

  @IsArray()
  newOrder: {
    position: number;
    // Legacy shape, kept for backward compatibility with clients that only ever reordered questions.
    questionId?: number;
    // Preferred shape, required to reorder a mix of questions and notes.
    entityType?: QuizItemEntityType;
    entityId?: number;
  }[];

}
