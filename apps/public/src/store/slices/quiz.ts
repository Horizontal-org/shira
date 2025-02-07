import { StateCreator } from "zustand"
import { getQuiz } from "../../fetch/quiz";
import { Quiz } from "../../domain/quiz";
import { Question } from "../../domain/question";


export interface QuizSlice {
  fetchQuiz: (
    apps: string[],
    fieldsOfWork: string[],
    language: string
  ) => void;
  quiz: Question[],
  correctedQuestions: Question[],
  setCorrectQuestions: (question: Question) => void
}

export const createQuizSlice: StateCreator<
  QuizSlice,
  [],
  [],
  QuizSlice
> = (set) => ({  
  fetchQuiz: async (apps, fieldsOfWork, language) => { 
    const res = await getQuiz(apps, fieldsOfWork, language)
    set({quiz: res})
  },
  quiz: [],
  correctedQuestions: [],
  setCorrectQuestions: (question) => {
    set(state => ({correctedQuestions: [...state.correctedQuestions.filter((c) => { 
      return c.id !== question.id
    }), question]}))
  }
})
