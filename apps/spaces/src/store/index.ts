import create from 'zustand'
import { ExplanationsSlice, createExplanationsSlice } from '../store/slices/explanation'
import { AppsSlice, createAppsSlice } from './slices/apps'
import { AuthSlice, createAuthSlice } from './slices/auth'
import { createFieldsOfWorkSlice, FieldsOfWorkSlice } from './slices/fields_of_work'
import { createQuestionSlice, QuestionSlice } from './slices/question'
import { TranslationsSlice, createTranslationsSlice } from './slices/translations'
import { LanguagesSlice, createLanguagesSlice } from './slices/languages'
import { GlobalTranslationsSlice, createGlobalTranslationsSlice } from './slices/global_translations'

export const useStore = create<
  ExplanationsSlice &
  AppsSlice &
  QuestionSlice & 
  AuthSlice & 
  FieldsOfWorkSlice & 
  TranslationsSlice & 
  GlobalTranslationsSlice &
  LanguagesSlice
>()((...a) => ({
  ...createExplanationsSlice(...a),
  ...createAppsSlice(...a),
  ...createQuestionSlice(...a),
  ...createAuthSlice(...a),
  ...createFieldsOfWorkSlice(...a),
  ...createTranslationsSlice(...a),
  ...createLanguagesSlice(...a),
  ...createGlobalTranslationsSlice(...a)
}))
