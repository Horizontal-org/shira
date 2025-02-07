import { StateCreator } from "zustand"

export interface SceneSlice {
  scene: string,
  changeScene: (scene: string) => void
}

export const createSceneSlice: StateCreator<
  SceneSlice,
  [],
  [],
  SceneSlice
> = (set) => ({
  scene: 'welcome',
  changeScene: (scene) => set((state) => ({scene: scene}))
})
