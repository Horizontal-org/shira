import { StateCreator } from "zustand"
import { fetchQuestion, fetchQuestions, Question, QuestionPayload } from "../../fetch/question"
import { App } from "../../fetch/app";
import { ActiveQuestion, defaultEmailContent, defaultMessageContent, EmailContent } from "../types/active_question";
import { Explanation } from "../types/explanation";
import { cloneDeep } from "lodash";

export interface ActiveQuestionSlice {
  activeQuestion: ActiveQuestion
  updateActiveQuestion: (key: string, value: string) => void
  updateActiveQuestionInput: (objectKey: string, inputKey: string, value: string) => void
  updateActiveQuestionApp: (app: App) => void
  updateActiveQuestionDraggableItem: (index: number, key: string, value: Object | string) => void
  updateActiveQuestionDraggableItems: (items: Array<Object>) => void
  removeActiveQuestionExplanation: (explIndex: number) => boolean
  getExplanationIds: () => Array<number>
  clearActiveQuestion: () => void
  setActiveQuestion: (activeQuestion: ActiveQuestion) => void
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
  },
  updateActiveQuestion: (key, value) => {
    set((state) => ({
      activeQuestion: {
        ...state.activeQuestion,
        [key]: value
      }
    }))
  },
  updateActiveQuestionApp: (app: App) => {
    set((state) => ({ activeQuestion: {
      ...state.activeQuestion,
      app: app,
      content: (state.activeQuestion.app && app.type !== state.activeQuestion.app.type) 
        ? (app.type === 'email' ? cloneDeep(defaultEmailContent) : cloneDeep(defaultMessageContent)) : state.activeQuestion.content 
    } }))
  },
  updateActiveQuestionInput: (objectKey, inputKey, value) => {
    let auxContent = cloneDeep(get().activeQuestion)
    auxContent['content'][objectKey][inputKey] = value
    set((state) => ({
      activeQuestion: auxContent 
    }))
  },
  updateActiveQuestionDraggableItem: (index, key, value) => {
    let auxContent = cloneDeep(get().activeQuestion)
    auxContent['content']['draggableItems'][index] = {
      ...auxContent['content']['draggableItems'][index],
      [key]: value
    }

    set((state) => ({
      activeQuestion: auxContent 
    }))
  }, 
  updateActiveQuestionDraggableItems: (items) => {
    let auxContent = cloneDeep(get().activeQuestion)
    auxContent['content']['draggableItems'] = items
 
    set((state) => ({
      activeQuestion: auxContent 
    }))
  },
  removeActiveQuestionExplanation: (explIndex: number) => {
    let auxContent = {...get().activeQuestion.content}
    let success = false

    Object.keys(auxContent).forEach((contentKey) => {
      if (Array.isArray(auxContent[contentKey])) {
        auxContent[contentKey].forEach((dragItem, index) => {
          if (dragItem.explanation && parseInt(dragItem.explanation) === explIndex) {
            // explanationIds.push(parseInt(dragItem.explanation))
            auxContent[contentKey][index]['explanation'] = null
            success = true
          } 
        })
      } else {
        if (auxContent[contentKey].explanation && parseInt(auxContent[contentKey].explanation) === explIndex) {
          // explanationIds.push(parseInt(auxContent[contentKey].explanation))
          auxContent[contentKey]['explanation'] = null
          success = true
        } 
      }
    })
    
    set((state) => ({
      activeQuestion: {
        ...state.activeQuestion,
        content: auxContent
      } 
    }))

    return success
  },
  getExplanationIds: () => {
    let explanationIds = []
    let auxContent = cloneDeep(get().activeQuestion.content)
    Object.keys(auxContent).forEach((contentKey) => {
      if (Array.isArray(auxContent[contentKey])) {
        auxContent[contentKey].forEach(dragItem => {
          if (dragItem.explanation) {
            explanationIds.push(parseInt(dragItem.explanation))
          } 
        })
      } else {
        if (auxContent[contentKey].explanation) {
          explanationIds.push(parseInt(auxContent[contentKey].explanation))
        } 
      }
    })
    return explanationIds
  },
  clearActiveQuestion: () => {
    set(() => ({
      activeQuestion: {
        app: null,
        name: '',
        isPhishing: true,
        content: null
      }
    }))
  },
  setActiveQuestion: (activeQuestion: ActiveQuestion) => {
    set(() => ({
      activeQuestion: activeQuestion
    }))
  }
})
