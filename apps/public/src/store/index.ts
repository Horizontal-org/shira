import { createWithEqualityFn } from 'zustand/traditional'
import { SceneSlice, createSceneSlice } from '../store/slices/scene'
import { AppsSlice, createAppsSlice } from './slices/apps'
import { createFieldsOfWorkSlice, FieldsOfWorkSlice } from './slices/fields_of_work'
import { createQuizSlice, QuizSlice } from './slices/quiz'
import { createQuizSetupSlice, QuizSetupSlice } from './slices/quiz_setup'
import { resetAllSlices, ResetSlice } from './slices/reset'

export const useStore = createWithEqualityFn<
  SceneSlice & 
  AppsSlice &
  FieldsOfWorkSlice & 
  QuizSetupSlice &
  QuizSlice & 
  ResetSlice
>()((...a) => ({
  ...createSceneSlice(...a),
  ...createAppsSlice(...a),
  ...createFieldsOfWorkSlice(...a),
  ...createQuizSetupSlice(...a),
  ...createQuizSlice(...a),
  ...resetAllSlices(...a)
}))
