import { createWithEqualityFn } from 'zustand/traditional'
import { ExplanationsSlice, createExplanationsSlice } from '../store/slices/explanation'
import { AppsSlice, createAppsSlice } from './slices/apps'
import { AuthSlice, createAuthSlice } from './slices/auth'
import { createFieldsOfWorkSlice, FieldsOfWorkSlice } from './slices/fields_of_work'
import { createQuestionSlice, QuestionSlice } from './slices/question'
import { TranslationsSlice, createTranslationsSlice } from './slices/translations'
import { LanguagesSlice, createLanguagesSlice } from './slices/languages'
import { GlobalTranslationsSlice, createGlobalTranslationsSlice } from './slices/global_translations'
import { createQuizSlice, QuizSlice } from './slices/quiz'
import { ActiveQuestionSlice, createActiveQuestionSlice } from './slices/active_question'
import { ResultSlice, createResultSlice  } from './slices/result'
import { createQuestionLibrarySlice, QuestionLibrarySlice } from './slices/question_library'

export const useStore = createWithEqualityFn<
  ExplanationsSlice &
  AppsSlice &
  QuestionSlice & 
  AuthSlice & 
  FieldsOfWorkSlice & 
  TranslationsSlice & 
  GlobalTranslationsSlice &
  LanguagesSlice & 
  QuizSlice &
  ActiveQuestionSlice &
  ResultSlice &
  QuestionLibrarySlice
>()((...a) => ({
  ...createExplanationsSlice(...a),
  ...createAppsSlice(...a),
  ...createQuestionSlice(...a),
  ...createAuthSlice(...a),
  ...createFieldsOfWorkSlice(...a),
  ...createTranslationsSlice(...a),
  ...createLanguagesSlice(...a),
  ...createGlobalTranslationsSlice(...a),
  ...createQuizSlice(...a),
  ...createActiveQuestionSlice(...a),
  ...createResultSlice(...a),
  ...createQuestionLibrarySlice(...a)
}))
