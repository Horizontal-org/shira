import { StateCreator } from "zustand"
import { App } from "../../domain/app"
import { getApps } from "../../fetch/app"

export interface AppsSlice {
  apps: App[],
  fetchApp: () => void
}

export const createAppsSlice: StateCreator<
  AppsSlice,
  [],
  [],
  AppsSlice
> = (set) => ({
  apps: [],
  fetchApp: async() => {
    const res = await getApps()
    set({apps: res})
  }
})
