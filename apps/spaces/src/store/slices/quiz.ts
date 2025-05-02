import { StateCreator } from "zustand"
import { createQuiz, deleteQuiz, getQuizzes, reorderQuiz, ReorderQuizPayload, updateQuiz, UpdateQuizPayload } from "../../fetch/quiz";
import { Type } from "typescript";

export enum QuizSuccessStates {
  update = 'UPDATE',
  delete = 'DELETE',
  create = 'CREATE',
  reorder = 'REORDER',
  question_created = 'QUESTION_CREATED',
  question_updated = 'QUESTION_UPDATED',
  question_deleted = 'QUESTION_DELETED',
}

export const SUCCESS_MESSAGES = {
  [QuizSuccessStates.update]: 'The quiz has been updated',
  [QuizSuccessStates.reorder]: 'The quiz order has been updated',
  [QuizSuccessStates.delete]: 'The quiz has been deleted',
  [QuizSuccessStates.create]: 'The quiz has been created',
  [QuizSuccessStates.question_created]: 'Question created',
  [QuizSuccessStates.question_updated]: 'Question updated',
  [QuizSuccessStates.question_deleted]: 'Question deleted',
};

export interface QuizQuestion {
  position: number
  question: {
    id: string
    name: string
  }
}

export interface Quiz {
  id: number;
  title: string;
  published: boolean;
  quizQuestions?: QuizQuestion[]
  updatedAt: string
  hash?: string;
}

export interface QuizSlice {
  quizzes: Quiz[] | []
  fetchQuizzes: () => void
  updateQuiz: (data: UpdateQuizPayload) => void,
  reorderQuiz: (data: ReorderQuizPayload) => void
  deleteQuiz: (id: number) => void,
  createQuiz: (title: string) => void,
  quizActionSuccess: null | QuizSuccessStates
  cleanQuizActionSuccess: () => void
  setQuizActionSuccess: (successState: string) => void
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
  reorderQuiz: async(reorderData: ReorderQuizPayload) => {
    set({quizActionSuccess: null})
    await reorderQuiz(reorderData)

    set({
      quizActionSuccess: QuizSuccessStates.reorder
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
  },
  setQuizActionSuccess: async(successState: QuizSuccessStates) => {
    set({quizActionSuccess: successState})
  },
})
