import { StateCreator } from "zustand"
import { fetchQuestion, fetchQuestions, Question, QuestionPayload } from "../../fetch/question"
import { App } from "../../fetch/app";
import { ActiveQuestion, defaultEmailContent, defaultMessageContent, EmailContent } from "../types/active_question";


export interface ActiveQuestionSlice {
  activeQuestion: ActiveQuestion
  updateActiveQuestion: (key: string, value: string) => void
  updateActiveQuestionInput: (objectKey: string, inputKey: string, value: string) => void
  updateActiveQuestionApp: (app: App) => void
}

export const createActiveQuestionSlice: StateCreator<
  ActiveQuestionSlice,
  [],
  [],
  ActiveQuestionSlice
> = (set, get) => ({
  activeQuestion: {
    app: null,
    name: '',
    isPhishing: true,
    content: {}
    // emailContent: {
    //   senderEmail: '',
    //   senderName: '',
    //   subject: '',
    //   body: '',
    //   draggableItems: []
    // },
    // messagingContent: {
    //   senderPhone: '',
    //   senderName: '',    
    //   draggableItems: []
    // },
  },
  updateActiveQuestion: (key, value) => {
    let auxContent = {...get().activeQuestion}
    auxContent[key] = value
    set((state) => ({
      activeQuestion: auxContent 
    }))
  },
  updateActiveQuestionApp: (app: App) => {
    let auxContent = {...get().activeQuestion}
    auxContent['content'] = app.type === 'email' ? defaultEmailContent : defaultMessageContent 
    auxContent['app'] = app
    set((state) => ({ activeQuestion: auxContent }))
  },
  updateActiveQuestionInput: (objectKey, inputKey, value) => {
    let auxContent = {...get().activeQuestion}
    auxContent[objectKey][inputKey] = value
    set((state) => ({
      activeQuestion: auxContent 
    }))
  },

})
