import { FunctionComponent, useEffect } from "react";
import { NoteFlowManagement } from "../NoteFlowManagement";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../../../store";
import { shallow } from "zustand/shallow";
import { QuizSuccessStates } from "../../../../store/slices/quiz";
import toast from "react-hot-toast";
import { NoteCRUDFeedback, useNoteCRUD } from "../../../../fetch/note";

interface Props { }

export const NoteCreationLayout: FunctionComponent<Props> = () => {

  const navigate = useNavigate()
  const { quizId } = useParams()
  const { submit, actionFeedback } = useNoteCRUD()
  const { setQuizActionSuccess } = useStore((state) => ({
    setQuizActionSuccess: state.setQuizActionSuccess
  }), shallow)

  useEffect(() => {
    if (actionFeedback === NoteCRUDFeedback.success) {
      setQuizActionSuccess(QuizSuccessStates.note_created)
      navigate(`/quiz/${quizId}`)
      return
    }

    if (actionFeedback === NoteCRUDFeedback.error) {
      toast.error('ERROR CREATING NOTE', { duration: 3000 })
    }
  }, [actionFeedback])

  return (
    <NoteFlowManagement
      actionFeedback={actionFeedback}
      onClose={() => { navigate(-1) }}
      onSubmit={(note) => { submit(quizId, note) }}
    />
  )
}
