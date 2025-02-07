import { StateCreator } from "zustand"
import produce from 'immer' 
import { App } from "../../domain/app"
import { FieldOfWork } from "../../domain/field_of_work";

interface QuizSetup {
  name?: string;
  email?: string;
  apps?: string[]
  fields_of_work?: string[]
}

export interface QuizSetupSlice {
  setup: QuizSetup;
  updateName: (name, email) => void;
  updateApps: (apps) => void;
  updateFieldsOfWork: (fields) => void
}

export const createQuizSetupSlice: StateCreator<
  QuizSetupSlice,
  [],
  [],
  QuizSetupSlice
> = (set) => ({
  setup: {
    name: '',
    email: '',
    apps: [],
    fields_of_work: []
  },
  updateName: (name, email) => { 
    set(produce((state) => {
      state.setup.name = name
      state.setup.email = email
    })) 
  },
  updateApps: (apps) => { 
    set(produce((state) => {
      state.setup.apps = apps
    }))
   },
  updateFieldsOfWork: (fields) => { 
    set(produce((state) => {
      state.setup.fields_of_work = fields
    }))
  }
})
