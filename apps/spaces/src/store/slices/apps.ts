import { StateCreator } from "zustand"
import { App, getApps } from "../../fetch/app"

export interface AppsSlice {
  apps: App[],
  fetchApp: () => void
  setSelectedApps: (apps: string[]) => void
  selectedApps: string[]
  clearSelectedApps: () => void
}

export const createAppsSlice: StateCreator<
  AppsSlice,
  [],
  [],
  AppsSlice
> = (set) => ({
  apps: [],
  selectedApps: [],
  fetchApp: async() => {
    const res = await getApps()
    set({apps: res})
  },
  setSelectedApps: (apps) => {
    set((state) => ({ selectedApps: [...apps] }))
  },
  clearSelectedApps: () => {
    set((state) => ({
      selectedApps: [],
    }))
  }
})
