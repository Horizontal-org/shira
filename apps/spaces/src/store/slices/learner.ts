import { StateCreator } from "zustand"
import { assignToQuiz } from "../../fetch/learner";

export interface LearnerSlice { }

export const createQuizSlice: StateCreator<
  LearnerSlice,
  [],
  [],
  LearnerSlice
> = () => ({
  createQuiz: async (learners: any) => {
    await assignToQuiz(learners)
  }
})
