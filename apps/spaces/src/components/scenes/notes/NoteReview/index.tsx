import { FunctionComponent, useMemo } from "react";
import { Note, styled } from '@horizontal-org/shira-ui'
import { ActiveNote } from "../../../../types/active_note";

interface Props {
  activeNote: ActiveNote
}

const getNoteContentProps = (activeNote: ActiveNote) => {
  const editorElement = document.createElement('div')
  const activeNoteContentItem = activeNote['content']
  if (!activeNoteContentItem.value || activeNoteContentItem.value.length === 0) {
    return editorElement
  }

  editorElement.innerHTML = activeNoteContentItem.value
  editorElement.setAttribute('id', activeNoteContentItem.htmlId)

  if (editorElement) {
    editorElement.querySelectorAll('a').forEach((element) => {
      element.setAttribute('onclick', 'return false;');
      element.setAttribute('oncontextmenu', 'return false;');
    })
    return editorElement
  }
  return document.createElement('div')
}

export const NoteReview: FunctionComponent<Props> = ({
  activeNote
}) => {

  const htmlContent = useMemo(() => {
    return getNoteContentProps(activeNote)
  }, [])

  return (
    <Wrapper>
      <Note
        content={htmlContent}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 1024px;
  width: 1024px;
`