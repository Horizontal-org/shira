import { StateCreator } from "zustand"
import { Question, getLibraryQuestions } from "../../fetch/question_library";

export interface QuestionLibrarySlice {
  libraryQuestions: Question[],
  getLibraryQuestions: (quizId: number) => void
}

export const createQuestionLibrarySlice: StateCreator<
  QuestionLibrarySlice,
  [],
  [],
  QuestionLibrarySlice
> = (set) => ({
  libraryQuestions: [],
  getLibraryQuestions: async() => {
    const res = await getLibraryQuestions()
    set({ libraryQuestions: res })
    console.log("SLICE res", res)
  }
})
