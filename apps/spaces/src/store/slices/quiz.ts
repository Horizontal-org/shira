import { StateCreator } from "zustand"
import { createQuiz, deleteQuiz, getQuizzes, updateQuiz, UpdateQuizPayload } from "../../fetch/quiz";

export enum QuizSuccessStates {
  update = 'UPDATE',
  delete = 'DELETE',
  create = 'CREATE',
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
  deleteQuiz: (id: number) => void,
  createQuiz: (title: string) => void,
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
  },
  deleteQuiz: async(id: number) => {
    set({quizActionSuccess: null})
    await deleteQuiz(id)

    const res = await getQuizzes()
    set({
      quizzes: res,
      quizActionSuccess: QuizSuccessStates.delete
    })
  },
  createQuiz: async(title: string) => {
    set({quizActionSuccess: null})
    await createQuiz(title)

    const res = await getQuizzes()
    set({
      quizzes: res,
      quizActionSuccess: QuizSuccessStates.create
    })
  }
})
