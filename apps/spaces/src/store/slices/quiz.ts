import { StateCreator } from "zustand"
import { createQuiz, deleteQuiz, getQuizzes, updateQuiz, UpdateQuizPayload } from "../../fetch/quiz";

export enum QuizSuccessStates {
  update = 'UPDATE',
  delete = 'DELETE',
  create = 'CREATE',
}

export const SUCCESS_MESSAGES = {
  [QuizSuccessStates.update]: 'The quiz has been updated',
  [QuizSuccessStates.delete]: 'The quiz has been deleted',
  [QuizSuccessStates.create]: 'The quiz has been created'
};

export interface Quiz {
  id: number;
  title: string;
  published: boolean;
  questions?: []
  updatedAt: string
}

export interface QuizSlice {
  quizzes: Quiz[] | []
  fetchQuizzes: () => void
  updateQuiz: (data: UpdateQuizPayload) => void,
  deleteQuiz: (id: number) => void,
  createQuiz: (title: string) => void,
  quizActionSuccess: null | QuizSuccessStates
  cleanQuizActionSuccess: () => void
}

export const createQuizSlice: StateCreator<
  QuizSlice,
  [],
  [],
  QuizSlice
> = (set) => ({
  quizzes: [],
  quizActionSuccess: null,
  cleanQuizActionSuccess: async() => {
    set({quizActionSuccess: null})
  },
  fetchQuizzes: async() => {
    const res = await getQuizzes()
    set({
      quizzes: res,
    })
  },
  updateQuiz: async(toUpdate: UpdateQuizPayload) => {
    set({quizActionSuccess: null})
    await updateQuiz(toUpdate)

    set({
      quizActionSuccess: QuizSuccessStates.update
    })
  },
  deleteQuiz: async(id: number) => {
    set({quizActionSuccess: null})
    await deleteQuiz(id)

    // TODO until we have a seamless loading state we should make fetch quizzes as soon as posible here
    const quizzes = await getQuizzes()

    set({
      quizActionSuccess: QuizSuccessStates.delete,
      quizzes: quizzes
    })
  },
  createQuiz: async(title: string) => {
    set({quizActionSuccess: null})
    await createQuiz(title)

    set({
      quizActionSuccess: QuizSuccessStates.create
    })
  }
})
