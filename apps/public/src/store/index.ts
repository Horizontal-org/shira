import create from 'zustand'
import { SceneSlice, createSceneSlice } from '../store/slices/scene'
import { AppsSlice, createAppsSlice } from './slices/apps'
import { createFieldsOfWorkSlice, FieldsOfWorkSlice } from './slices/fields_of_work'
import { createQuizSlice, QuizSlice } from './slices/quiz'
import { createQuizSetupSlice, QuizSetupSlice } from './slices/quiz_setup'

export const useStore = create<
  SceneSlice & 
  AppsSlice &
  FieldsOfWorkSlice & 
  QuizSetupSlice &
  QuizSlice
>()((...a) => ({
  ...createSceneSlice(...a),
  ...createAppsSlice(...a),
  ...createFieldsOfWorkSlice(...a),
  ...createQuizSetupSlice(...a),
  ...createQuizSlice(...a)
}))
