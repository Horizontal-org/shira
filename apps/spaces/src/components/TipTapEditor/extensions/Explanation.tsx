import { Extension, Mark, mergeAttributes } from '@tiptap/core'

export interface HighlightOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    explanation: {
      /**
       * Set a highlight mark
       */
       setExplanation: (attributes?: { dataId: string }) => ReturnType,
      /**
       * Toggle a highlight mark
       */
       toggleExplanation: (attributes?: { dataId: string }) => ReturnType,
      /**
       * Unset a highlight mark
       */
       unsetExplanation: () => ReturnType,
    }
  }
}


export const Explanation = Mark.create<HighlightOptions>({
  name: 'explanation',

  // Your code goes here.
  parseHTML() {
    return [
      {
        tag: 'mark',
      },
    ]
  },

  addOptions() {
    return {
      HTMLAttributes: {}
    }
  },

  addAttributes() {
    
    return {
      'data-explanation': {
        default: null,
      },
    }
  },

  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },


  addCommands() {
    return {
      setExplanation: attributes => ({ commands }) => {
        return commands.setMark(this.name, attributes)
      },
      toggleExplanation: attributes => ({ commands }) => {
        return commands.toggleMark(this.name, attributes)
      },
      unsetExplanation: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },
})