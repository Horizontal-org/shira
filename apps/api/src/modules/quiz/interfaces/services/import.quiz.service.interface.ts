import { SpaceEntity } from "src/modules/space/domain/space.entity"
import { QuizVisibility } from "../../dto/quiz-visibility-enum.quiz"
import { QuizImportValidationResult } from "../../services/validate-import.quiz.service"

export interface ImportQuizParams {
  title: string
  questions: QuizImportValidationResult["questions"]
  space: SpaceEntity
  visibility: QuizVisibility
}

export interface IImportQuizService {
  execute(params: ImportQuizParams): Promise<number>
}
