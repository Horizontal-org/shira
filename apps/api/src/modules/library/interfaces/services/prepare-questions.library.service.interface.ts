import { Question } from 'src/modules/question/domain'

export interface IPrepareQuestionsLibraryService {
  getQuestion(questionId: number, spaceId: number): Promise<Question>
  getQuestionsByQuizId(quizId: number, spaceId: number): Promise<Question[]>
  prepareQuestionForPublishing(question: Question, apiKey: string): Promise<{
    name: string
    isPhishing: boolean
    content: string
    defaultApp: string
    appType: string
    explanations: { position: string, index: number, content: string }[]
    templateImageIds: number[]
  } | null>
}
