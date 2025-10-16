import { StateCreator } from "zustand"
import { QuestionLibraryDto, getLibraryQuestions } from "../../fetch/question_library";

export interface QuestionLibrarySlice {
  libraryQuestions: QuestionLibraryDto,
  getLibraryQuestions: (quizId: number) => void
}

export const createQuestionLibrarySlice: StateCreator<
  QuestionLibrarySlice,
  [],
  [],
  QuestionLibrarySlice
> = (set) => ({
  libraryQuestions: null,
  getLibraryQuestions: async() => {
    const res = await getLibraryQuestions()
    set({ libraryQuestions: res })
  }
})
