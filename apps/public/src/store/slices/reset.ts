import { SceneSlice, createSceneSlice } from '../slices/scene'
import { AppsSlice, createAppsSlice } from '../slices/apps'
import { createFieldsOfWorkSlice, FieldsOfWorkSlice } from '../slices/fields_of_work'
import { createQuizSlice, QuizSlice } from '../slices/quiz'
import { createQuizSetupSlice, QuizSetupSlice } from '../slices/quiz_setup'
import { StateCreator } from 'zustand'
import { useStore } from '..'

export interface ResetSlice {
  resetAll: () => void
}

export const resetAllSlices: StateCreator<
  ResetSlice,
  [],
  [],
  ResetSlice
>  = (set) => ({
  resetAll: () => {
    set(useStore.getInitialState(), true)
  },
})
