import { StateCreator } from "zustand"
import { createQuiz, deleteQuiz, getQuizzes, reorderQuiz, ReorderQuizPayload, updateQuiz, UpdateQuizPayload } from "../../fetch/quiz";

export enum QuizSuccessStates {
  update = 'UPDATE',
  delete = 'DELETE',
  create = 'CREATE',
  reorder = 'REORDER',
  question_created = 'QUESTION_CREATED',
  question_updated = 'QUESTION_UPDATED',
  question_deleted = 'QUESTION_DELETED',
  question_added_from_library = 'QUESTION_ADDED_FROM_LIBRARY',
}

export const SUCCESS_MESSAGES = {
  [QuizSuccessStates.update]: "success_messages.quiz_updated",
  [QuizSuccessStates.reorder]: "success_messages.quiz_order_updated",
  [QuizSuccessStates.delete]: "success_messages.quiz_deleted",
  [QuizSuccessStates.create]: "success_messages.quiz_created",
  [QuizSuccessStates.question_created]: "success_messages.question_created",
  [QuizSuccessStates.question_updated]: "success_messages.question_updated",
  [QuizSuccessStates.question_deleted]: "success_messages.question_deleted",
  [QuizSuccessStates.question_added_from_library]: "success_messages.question_added",
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
  visibility?: string
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
  cleanQuizActionSuccess: async () => {
    set({ quizActionSuccess: null })
  },
  fetchQuizzes: async () => {
    const res = await getQuizzes()
    set({
      quizzes: res,
    })
  },
  updateQuiz: async (toUpdate: UpdateQuizPayload) => {
    set({ quizActionSuccess: null })
    await updateQuiz(toUpdate)

    set({
      quizActionSuccess: QuizSuccessStates.update
    })
  },
  reorderQuiz: async (reorderData: ReorderQuizPayload) => {
    set({ quizActionSuccess: null })
    await reorderQuiz(reorderData)

    set({
      quizActionSuccess: QuizSuccessStates.reorder
    })
  },
  deleteQuiz: async (id: number) => {
    set({ quizActionSuccess: null })
    await deleteQuiz(id)

    // TODO until we have a seamless loading state we should make fetch quizzes as soon as posible here
    const quizzes = await getQuizzes()

    set({
      quizActionSuccess: QuizSuccessStates.delete,
      quizzes: quizzes
    })
  },
  createQuiz: async (title: string) => {
    set({ quizActionSuccess: null })
    await createQuiz(title)

    set({
      quizActionSuccess: QuizSuccessStates.create
    })
  },
  setQuizActionSuccess: async (successState: QuizSuccessStates) => {
    set({ quizActionSuccess: successState })
  },
})
