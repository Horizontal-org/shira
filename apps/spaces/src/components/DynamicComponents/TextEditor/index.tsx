import React, { useEffect, useState, useCallback } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { EditorContent, useEditor } from '@tiptap/react'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import { Explanation } from './extensions/Explanation'
import { MenuBar } from './components/MenuBar'
import shallow from 'zustand/shallow'
import { useStore } from '../../../store'
import { SearchNReplace } from './extensions/Search'
import { subscribe, unsubscribe } from '../../../utils/customEvent'

Highlight.configure({
  HTMLAttributes: {
    class: 'explanation',
  },
})

const defaultInitialContent = `
<h2>
  Text
</h2>
<p>
  Body
</p>
`

const markExplanations = (editorId, selectedExplanation) => { 
  const explanations = document.getElementById(editorId).querySelectorAll('[data-explanation]')
  explanations.forEach((e) => {        
    if (e.classList.contains('mark-active')) {
      e.classList.remove('mark-active')
    }
  })

  setTimeout(() => {
    explanations.forEach((e) => {
      //TODO Multiple marks per explanation
      const dataExplanation = e.getAttribute('data-explanation')
      if (parseInt(dataExplanation) === +selectedExplanation) {          
        e.classList.add('mark-active')
      }
    })
  }, 100)
}


const cleanDeletedExplanations = (editor, deleteIndex) => {
  if (editor) {
    editor.state.doc.descendants((node, pos) => {
      node.marks.forEach(mark => {
        if (mark.attrs['data-explanation']) {
          if (mark.attrs['data-explanation'] === +deleteIndex) {
            editor.chain().focus().setTextSelection(pos + 1).run()
            editor.chain().focus().unsetExplanation().run()
          }
        }
      })
    })
  }  
}

interface Props {
  componentId?: string;
  componentPosition?: string
  initialContent?: string
}

export const TextEditor = ({ componentId, componentPosition, initialContent }: Props) => {
  const {
    changeSelected,
    selectedExplanation,
    setContent,
    storeExplanations
  } = useStore((state) => ({
    changeSelected: state.changeSelected,
    selectedExplanation: state.selectedExplanation,
    setContent: state.setContent,
    storeExplanations: state.explanations
  }), shallow)

  const editorId = `component-text-${componentId}`

  const [rawHtml, handleRawHtml] = useState(null)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Explanation,
      SearchNReplace,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialContent ?? defaultInitialContent,
    onSelectionUpdate(props) {      
      if (props.editor.isActive('explanation')) {
        props.editor.commands.extendMarkRange('explanation')
        const dataIndex = props.editor.getAttributes('explanation')['data-explanation']
        if (dataIndex !== selectedExplanation) {
          changeSelected(dataIndex)
        }
      }
    },
    onUpdate(props) {
      handleRawHtml(props.editor.getHTML())      
    },
    onCreate(props) {
      handleRawHtml(props.editor.getHTML())

      subscribe('delete-explanation', (event) => {
        cleanDeletedExplanations(props.editor, event.detail.deleteIndex)
      })
    }
  })

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])
  
  useEffect(() => {
    if (editor) {
      markExplanations(editorId, selectedExplanation)      
    }
  }, [selectedExplanation])
  
  useEffect(() => {
    return () => {
      unsubscribe('delete-explanation')
    }
  }, [])

  useEffect(() => {
    const parsed = `<div data-position='${componentPosition}' id='${editorId}'>${rawHtml}</div>`
    setContent(editorId, parsed)
  }, [componentPosition, rawHtml])

  return (
    <Wrapper>
        
      <EditorWrapper>
        <EditorStyles />
        <div></div>
        <EditorContent id={editorId} editor={editor} />
        <MenuBar editor={editor} setLink={setLink} />
      </EditorWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  
`

const EditorWrapper = styled.div`
  padding: 6px;
  background: #eee;
  border-radius: 4px;  
  display: inline-block;
`

const EditorStyles = createGlobalStyle`
/* Basic editor styles */
.ProseMirror {
  background: white;
  border-radius: 4px;

  padding: 8px 20px;

  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgb(13,13,13, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgb(13,13,13, 0.1);
    margin: 2rem 0;
  }
}

.is-active {
  background: black;
  color: #fff;
}

button {
  font-size: inherit;
  font-family: inherit;
  color: #000;
  margin: 0.1rem;
  border: 1px solid black;
  border-radius: 0.3rem;
  padding: 0.1rem 0.4rem;
  background: white;
  accent-color: black;
}

.mark-active {
  background: #FCC934;
}

.mark-normal {
  background: green;
}
`
