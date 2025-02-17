import { StateCreator } from "zustand"
import { getQuizzes } from "../../fetch/quiz";

export interface Quiz {
  id: number;
  title: string;
  published: boolean;
  updatedAt: string
}

export interface QuizSlice {
  quizzes: Quiz[] | null
  fetchQuizzes: () => void
}

export const createQuizSlice: StateCreator<
  QuizSlice,
  [],
  [],
  QuizSlice
> = (set) => ({
  quizzes: null,
  fetchQuizzes: async() => {
    const res = await getQuizzes()
    set({quizzes: res})
  }  
})
