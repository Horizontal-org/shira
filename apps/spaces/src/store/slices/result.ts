import { StateCreator } from "zustand"

export interface ResultSlice {
  fetchQuizzes: () => void
  deleteQuiz: (id: number) => void,
  createQuiz: (title: string) => void,
  cleanQuizActionSuccess: () => void
  setQuizActionSuccess: (successState: string) => void
}

export const createResultSlice: StateCreator<
  ResultSlice,
  [],
  [],
  ResultSlice
> = (set) => ({})
