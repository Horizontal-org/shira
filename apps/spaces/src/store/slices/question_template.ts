import { StateCreator } from "zustand"
import { LibraryQuestionTemplateDto, getQuestionTemplates } from "../../fetch/question_templates";

export interface QuestionTemplateSlice {
  templateQuestions: LibraryQuestionTemplateDto[] | null,
  fetchTemplateQuestions: () => void
}

export const buildQuestionTemplateSlice: StateCreator<
  QuestionTemplateSlice,
  [],
  [],
  QuestionTemplateSlice
> = (set) => ({
  templateQuestions: null,
  fetchTemplateQuestions: async () => {
    const res = await getQuestionTemplates({ page: 1, limit: 1000 })
    set({ templateQuestions: res.data })
  }
})
