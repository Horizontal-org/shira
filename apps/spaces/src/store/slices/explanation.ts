import { StateCreator } from "zustand"

export interface Explanation {
  index: number;
  text?: string;
  position?: number;
  id?: number;
}

export interface ExplanationsSlice {
  explanations: Explanation[],
  selectedExplanation: number;
  // last explanation index
  explanationIndex: number;
  addExplanation: (index: number, text?: string, position?: number) => void
  setInitialExplanations: (explanations: Explanation[]) => void
  updateExplanation: (index: number, text: string, position?: number, id?: number) => void
  updateExplanations: (explanations: Explanation[]) => void
  deleteExplanation: (index: number) => void
  deleteExplanations: (componentId: number, componentType: string) => void
  changeSelected: (index: number) => void
  clearExplanations: () => void
}

export const createExplanationsSlice: StateCreator<
  ExplanationsSlice,
  [],
  [],
  ExplanationsSlice
> = (set, get) => ({
  explanations: [],
  selectedExplanation: 0,
  explanationIndex: 0,
  addExplanation: (index, text, position) => {
    set((state) => ({
      explanations: [
        ...state.explanations,
        { 
          index: index, 
          text: text ?? '', 
          position: position ?? index
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
      selectedExplanation: explanations.length
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
  updateExplanation: (index, text, position, id) => {
    let oldExplanations = get().explanations.filter(e => e.index !== index)
    const explanations = [
      ...oldExplanations,
      { id, index: index, text: text, position: position}
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
      selectedExplanation: 0,
      explanationIndex: 0,
    }))
  },
})
