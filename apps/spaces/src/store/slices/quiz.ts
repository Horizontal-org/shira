import { StateCreator } from "zustand"
import { getQuizzes, updateQuiz, UpdateQuizPayload } from "../../fetch/quiz";

export enum QuizSuccessStates {
  update = 'UPDATE',
  fetch = 'FETCH'
}

export interface Quiz {
  id: number;
  title: string;
  published: boolean;
  updatedAt: string
}

export interface QuizSlice {
  quizzes: Quiz[] | []
  fetchQuizzes: () => void
  updateQuiz: (data: UpdateQuizPayload) => void,
  quizActionSuccess: null | QuizSuccessStates
}

export const createQuizSlice: StateCreator<
  QuizSlice,
  [],
  [],
  QuizSlice
> = (set) => ({
  quizzes: [],
  quizActionSuccess: null,
  fetchQuizzes: async() => {
    set({quizActionSuccess: null})

    const res = await getQuizzes()
    set({
      quizzes: res,
      quizActionSuccess: QuizSuccessStates.fetch
    })
  },
  updateQuiz: async(toUpdate: UpdateQuizPayload) => {
    set({quizActionSuccess: null})
    await updateQuiz(toUpdate)

    const res = await getQuizzes()
    set({
      quizzes: res,
      quizActionSuccess: QuizSuccessStates.update
    })
  }
})
