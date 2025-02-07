import { StateCreator } from "zustand"
import { App, getApps } from "../../fetch/app"
import { FieldOfWork, getFieldsOfWork } from "../../fetch/field_of_work"

export interface FieldsOfWorkSlice {
  fields_of_work: FieldOfWork[],
  fetchFieldsOfWork: () => void
  setSelectedFieldsOfWork: (f: string) => void
  selectedFieldsOfWork: string
  clearSelectedFieldsOfWork: () => void
}

export const createFieldsOfWorkSlice: StateCreator<
  FieldsOfWorkSlice,
  [],
  [],
  FieldsOfWorkSlice
> = (set) => ({
  fields_of_work: [],
  selectedFieldsOfWork: null,
  fetchFieldsOfWork: async() => {
    const res = await getFieldsOfWork()
    set({fields_of_work: res})
  },
  setSelectedFieldsOfWork: (f) => {
    set((state) => ({ selectedFieldsOfWork: f }))
  },
  clearSelectedFieldsOfWork: () => {
    set((state) => ({
      selectedFieldsOfWork: null,
    }))
  }
})
