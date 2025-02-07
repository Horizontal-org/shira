import { StateCreator } from "zustand"

export interface TranslationsSlice {
  showTranslationsScene: string | null
  handleTranslationsScene: (questionId: string) => void
}
// translationFiles: [],
// setTranslationFiles: (t) => void

export const createTranslationsSlice: StateCreator<
  TranslationsSlice,
  [],
  [],
  TranslationsSlice
> = (set) => ({
  showTranslationsScene: null,
  handleTranslationsScene: (questionId) => {
    set({showTranslationsScene: questionId})
  },
  // translationFiles: null,
  // setTranslationFiles: (t) => {
  //   set({ translationFiles: t })
  // }
})
