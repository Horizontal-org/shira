import { FunctionComponent } from "react";
import { NoteFlowManagement } from "../NoteFlowManagement";
import { useNavigate, useParams } from "react-router-dom";

interface Props { }

export const NoteCreationLayout: FunctionComponent<Props> = () => {

  const navigate = useNavigate()
  const { quizId } = useParams()

  return (
    <NoteFlowManagement
      onClose={() => { navigate(-1) }}
    />
  )
}