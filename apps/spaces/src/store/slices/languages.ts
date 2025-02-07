import { StateCreator } from "zustand"
import { getLanguages } from "../../fetch/translations"

export interface Language {
  id: string;
  code: string;
  name: string;
}

export interface LanguagesSlice {
  languages: Language[] | null
  fetchLanguages: () => void
}

export const createLanguagesSlice: StateCreator<
  LanguagesSlice,
  [],
  [],
  LanguagesSlice
> = (set) => ({
  languages: null,
  fetchLanguages: async() => {
    const res = await getLanguages()
    set({languages: res})
  }  
})
