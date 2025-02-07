import { StateCreator } from "zustand"
import { fetchQuestion, fetchQuestions, Question, QuestionPayload } from "../../fetch/question"

export interface QuestionSlice {
  content: {}
  optionalContent: {}
  requiredContent: {}
  lastIndex: number
  setContent: (id: string, html: string) => void
  setOptionalContent: (id: string, html: string) => void
  setRequiredContent: (id: string, html: string) => void
  setLastIndex: (newIndex: number) => void
  deleteContent: (componentId: string) => void
  clearQuestion: () => void
  fetchQuestions: () => void
  fetchQuestion: (id: string) => void
  questions: Question[],
  question?: QuestionPayload, 
}

export const createQuestionSlice: StateCreator<
  QuestionSlice,
  [],
  [],
  QuestionSlice
> = (set, get) => ({
  lastIndex: 1,
  content: {},
  optionalContent: {},
  requiredContent: {},
  questions: [],
  question: null,
  setContent: (id, html) => {
    let auxContent = {...get().content}
    auxContent[id] = html
    set((state) => ({
     content: auxContent 
    }))
  },
  setOptionalContent: (id, html) => {
    let auxContent = {...get().optionalContent}
    auxContent[id] = html
    set((state) => ({
     optionalContent: auxContent 
    }))
  },
  setRequiredContent: (id, html) => {
    let auxContent = {...get().requiredContent}
    auxContent[id] = html
    set((state) => ({
     requiredContent: auxContent 
    }))
  },
  setLastIndex: (newIndex) => {
    set((state) => ({ lastIndex: newIndex }))
  }, 
  deleteContent: (componentId) => {    
    const auxContent = {...get().content}
    let newContent = {}
    Object.keys(get().content)
      .filter(k => k !== componentId)
      .forEach(v => {
        newContent[v] = auxContent[v]
      })

    set((state) => ({ content: newContent }))
  },
  clearQuestion: () => {
    set((state) => ({
      content: {},
      optionalContent: {},
      requiredContent: {},
      lastIndex: 1
    }))
  },
  fetchQuestions: async() => {
    const res = await fetchQuestions()
    set({questions: res})
  },
  fetchQuestion: async(id: string) => {
    const res = await fetchQuestion(id)
    set({ question: res })
  }
})
