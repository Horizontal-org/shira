import { FunctionComponent, useEffect, useState } from "react"
import { NoteFlowManagement } from "../NoteFlowManagement"
import { useNavigate, useParams } from "react-router-dom"
import { useStore } from "../../../../store"
import { shallow } from "zustand/shallow"
import { QuizSuccessStates } from "../../../../store/slices/quiz"
import toast from "react-hot-toast"
import { fetchNote, NoteCRUDFeedback, useNoteCRUD } from "../../../../fetch/note"
import { ActiveNote } from "../../../../types/active_note"

interface Props { }

export const NoteEditLayout: FunctionComponent<Props> = () => {

  const navigate = useNavigate()
  const { quizId, noteId } = useParams()
  const { edit, actionFeedback } = useNoteCRUD()
  const { setQuizActionSuccess } = useStore((state) => ({
    setQuizActionSuccess: state.setQuizActionSuccess
  }), shallow)

  const [initialNote, handleInitialNote] = useState<ActiveNote>(null)

  useEffect(() => {
    const getNote = async () => {
      try {
        const note = await fetchNote(noteId, quizId)
        handleInitialNote({
          name: note.name,
          content: {
            value: note.content,
            htmlId: 'component-text-1',
            contentType: 'editor'
          }
        })
      } catch (err) {
        navigate(`/quiz/${quizId}`)
      }
    }

    getNote()
  }, [])

  useEffect(() => {
    if (actionFeedback === NoteCRUDFeedback.success) {
      setQuizActionSuccess(QuizSuccessStates.note_updated)
      navigate(`/quiz/${quizId}`)
      return
    }

    if (actionFeedback === NoteCRUDFeedback.error) {
      toast.error('ERROR EDITING NOTE', { duration: 3000 })
    }
  }, [actionFeedback])

  if (!initialNote) {
    return null
  }

  return (
    <NoteFlowManagement
      initialNote={initialNote}
      actionFeedback={actionFeedback}
      onClose={() => { navigate(-1) }}
      onSubmit={(note) => { edit(quizId, note, noteId) }}
    />
  )
}
