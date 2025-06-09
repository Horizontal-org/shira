import { createGlobalStyle, styled } from '@shira/ui'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { MenuBar } from './MenuBar'
import { useCallback, useEffect } from 'react'

// tiptap extensions 
import Blockquote from '@tiptap/extension-blockquote'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import OrderedList from '@tiptap/extension-ordered-list'
import Underline from '@tiptap/extension-underline'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Dropcursor from '@tiptap/extension-dropcursor'
import Gapcursor from '@tiptap/extension-gapcursor'
import ListKeymap from '@tiptap/extension-list-keymap'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import Link from '@tiptap/extension-link'
import { useStore } from '../../store'
import { shallow } from 'zustand/shallow'
import { Explanation } from './extensions/Explanation'
import { subscribe, unsubscribe } from '../../utils/customEvent'
import { SearchNReplace } from './extensions/Search'
// tiptap extensions 

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
  if (!editor) return
  
  const { tr } = editor.state
  let hasChanges = false

  editor.state.doc.descendants((node, pos) => {
    if(!node.isText) return

    node.marks.forEach(mark => {
      if(mark.attrs['data-explanation'] === +deleteIndex) {
        tr.removeMark(pos, pos + node.nodeSize, mark.type)
        hasChanges = true
      }
    })
  })

  if(hasChanges) {
    editor.view.dispatch(tr)
  }
}

const cleanupOrphanedExplanations = (editor, explanations, deleteExplanation) => {
  if(!editor) return
  
  const activeExplanationIndexes = new Set()

  editor.state.doc.descendants((node) => {
    node.marks.forEach(mark => {
      if(mark.attrs['data-explanation']) {
        activeExplanationIndexes.add(parseInt(mark.attrs['data-explanation']))
      }
    })
  })

  const orphanedExplanations = explanations.filter(explanation => !activeExplanationIndexes.has(explanation.index)) 

  orphanedExplanations.forEach(orphan => {
    console.log(`Cleaning up orphaned explanation from email editor: ${orphan.index}`)
    deleteExplanation(orphan.index)
  })
}

interface Props {
  onChange: (body: string) => void;
}
export const EmailTipTapEditor = ({
  onChange,
  initialContent = null
}) => {
  const {
    changeSelected,
    selectedExplanation,
    storeExplanations,
    deleteExplanation
  } = useStore((state) => ({
    changeSelected: state.changeSelected,
    selectedExplanation: state.selectedExplanation,
    storeExplanations: state.explanations,
    deleteExplanation: state.deleteExplanation
  }), shallow)

  // const editorId = `component-text-${componentId}`
  const editorId = `component-text-1`

  const editor = useEditor({
    extensions: [
      StarterKit,
      // tiptap extensions
      Blockquote,
      HorizontalRule,
      OrderedList,
      Underline,
      TextStyle,
      Color,
      Dropcursor,
      Gapcursor,
      ListKeymap,
      Typography,
      // History,
      Placeholder.configure({        
        placeholder: 'Write something …',
      }),
      Explanation,
      SearchNReplace,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialContent ?? null,
    onSelectionUpdate(props) {      
      if (props.editor.isActive('explanation')) {
        // props.editor.commands.extendMarkRange('explanation')
        const dataIndex = props.editor.getAttributes('explanation')['data-explanation']
        if (dataIndex !== selectedExplanation) {
          changeSelected(dataIndex)
        }
      } else {
        if(selectedExplanation !== null) {
          changeSelected(null)
        }
      }
    },
    onUpdate(props) {
      console.log('ON CHANGE')
      onChange(props.editor.getHTML())
      
      setTimeout(() => {
        cleanupOrphanedExplanations(props.editor, storeExplanations, deleteExplanation)
      }, 100)
    },
    onCreate(props) {
      // handleRawHtml(props.editor.getHTML())

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
  padding: 20px 0;
`

const EditorWrapper = styled.div`
  display: inline-block;
  width: 100%;
`

const EditorStyles = createGlobalStyle`
.ProseMirror {
  background: white;
  border-radius: 16px;
  border: 2px solid ${props => props.theme.secondary.dark};
  padding: 8px 20px;
  min-height: 150px;

  /* Focus state */
  &:focus:not(:disabled) {
      box-shadow: 0 0 0 2px ${props => `${props.theme.secondary.dark}33`};
      outline: none;
  }

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

  p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  mark[data-explanation] {
    background: #F3F9CF;
    padding: 1px 2px;
    border-radius: 2px;
    
    /* Allow cursor placement at boundaries */
    position: relative;
    
    &.mark-active {
      background: #FCC934;
    }
  }

  .ProseMirror-gapcursor {
    display: block;
    pointer-events: none;
    position: relative;
  }

  .ProseMirror-gapcursor:after {
    content: '';
    display: block;
    position: absolute;
    top: -2px;
    width: 20px;
    border-top: 1px solid black;
    animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
  }
}

/* explanations */
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

@keyframes ProseMirror-cursor-blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
`


// <EditorProvider extensions={extensions} content={content}>
    //   <FloatingMenu editor={null}>This is the floating menu</FloatingMenu>
    //   <BubbleMenu editor={null}>This is the bubble menu</BubbleMenu>
    // </EditorProvider>