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
