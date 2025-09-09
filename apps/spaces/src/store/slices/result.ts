import { StateCreator } from "zustand"
import { getQuizResults } from "../../fetch/results"

export interface ResultSlice {
  result: Result | {},
  getQuizResults: (quizId: number) => void
}

export interface Result {
  id: number;
}

export const createResultSlice: StateCreator<
  ResultSlice,
  [],
  [],
  ResultSlice
> = (set) => ({
  result: {},
  getQuizResults: async(quizId: number) => {
    const res = await getQuizResults(quizId)
      set({ result: res })
  }
})
