import { StateCreator } from "zustand"

export interface GlobalLanguage {
  lang: string;
  file: File;
  html: HTMLElement;
}

export interface GlobalTranslationsSlice {
  globalTranslations: GlobalLanguage[] | null;
  handleGlobalTranslations: (newT: GlobalLanguage[]) => void
}

export const createGlobalTranslationsSlice: StateCreator<
  GlobalTranslationsSlice,
  [],
  [],
  GlobalTranslationsSlice
> = (set) => ({
  globalTranslations: null,
  handleGlobalTranslations: (newT) => {
    set({globalTranslations: newT})
  }  
})
