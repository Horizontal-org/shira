import { StateCreator } from "zustand"

export interface Explanation {
  index: number;
  text?: string;
  position?: number;
  id?: number;
  title?: string
}

export interface ExplanationsSlice {
  explanations: Explanation[],
  selectedExplanation: number | null;
  // last explanation index
  explanationIndex: number;
  addExplanation: (index: number, title?: string) => void
  setInitialExplanations: (explanations: Explanation[]) => void
  updateExplanation: (index: number, text: string, position?: number, id?: number, title?: string) => void
  updateExplanations: (explanations: Explanation[]) => void
  deleteExplanation: (index: number) => void
  deleteExplanations: (componentId: number, componentType: string) => void
  changeSelected: (index: number | null) => void
  clearExplanations: () => void
}

export const createExplanationsSlice: StateCreator<
  ExplanationsSlice,
  [],
  [],
  ExplanationsSlice
> = (set, get) => ({
  explanations: [],
  selectedExplanation: null,
  explanationIndex: 0,
  addExplanation: (index, title) => {
    set((state) => ({
      explanations: [
        ...state.explanations,
        { 
          index: index, 
          text: '', 
          position:  index,
          title: title
        }
      ],
      explanationIndex: index,
      selectedExplanation: index
    }))
  },
  setInitialExplanations: (explanations: Explanation[]) => {
    set(() => ({
      explanations,
      explanationIndex: +(explanations.reduce((prev, curr) => prev.index > curr.index ? prev : curr).index),
      selectedExplanation: null
    }))
  },
  deleteExplanation: (index) => {
    set((state) => ({
      explanations: state.explanations.filter(e => e.index !== index)
    }))
  },
  deleteExplanations: (componentId, componentType) => {
    let explanations = null
    if (componentType === 'text') {
      explanations = document.getElementById(`component-${componentType}-${componentId}`).querySelectorAll('[data-explanation]')
    } else {
      explanations = [document.getElementById(`component-${componentType}-${componentId}`)]
    }

    const toDelete = []    
    explanations.forEach((e) => {
      const dataExplanation = parseInt(e.getAttribute('data-explanation'))
      toDelete.push(dataExplanation)
    })
    set((state) => ({
      explanations: state.explanations.filter(e => !toDelete.includes(+e.index))
    }))
  },
  updateExplanation: (index, text, position, id, title) => {
    let oldExplanations = get().explanations.filter(e => e.index !== index)
    const explanations = [
      ...oldExplanations,
      { id, index: index, text: text, position: position, title: title}
    ].sort((a, b) => a.position - b.position)

    set((state) => ({
     explanations: explanations
    }))
  },
  updateExplanations: (ex) => {
    set((state) => ({ explanations: ex }))
  },
  changeSelected: (index) => set((state) => ({
    selectedExplanation: index
  })),
  clearExplanations: () => {
    set((state) => ({
      explanations: [],
      selectedExplanation: null,
      explanationIndex: 0,
    }))
  },
})
