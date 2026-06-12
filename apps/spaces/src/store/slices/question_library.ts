import { StateCreator } from "zustand"
import { LibraryQuestionTemplateDto, getQuestionTemplates } from "../../fetch/question_templates";

export interface QuestionTemplateSlice {
  templateQuestions: LibraryQuestionTemplateDto[] | null,
  fetchLibraryQuestions: () => void
}

export const buildQuestionLibrarySlice: StateCreator<
  QuestionTemplateSlice,
  [],
  [],
  QuestionTemplateSlice
> = (set) => ({
  templateQuestions: null,
  fetchLibraryQuestions: async () => {
    const res = await getQuestionTemplates({ page: 1, limit: 1000 })
    set({ templateQuestions: res.data })
  }
})
