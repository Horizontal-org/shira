import { StateCreator } from "zustand"
import axios from 'axios'
import { FieldOfWork } from "../../domain/field_of_work"
import { getFieldsOfWork } from "../../fetch/field_of_work"

export interface FieldsOfWorkSlice {
  fieldsOfWork: FieldOfWork[],
  fetchFieldsOfWork: () => void
}

export const createFieldsOfWorkSlice: StateCreator<
  FieldsOfWorkSlice,
  [],
  [],
  FieldsOfWorkSlice
> = (set) => ({
  fieldsOfWork: [],
  fetchFieldsOfWork: async() => {
    const res = await getFieldsOfWork()
    set({fieldsOfWork: res})
  }
})
