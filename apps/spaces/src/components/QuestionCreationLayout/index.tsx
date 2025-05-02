import { FunctionComponent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionCRUDFeedback, useQuestionCRUD } from "../../fetch/question";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { QuizSuccessStates } from "../../store/slices/quiz";
import toast from "react-hot-toast";
import { QuestionFlowManagement } from "../QuestionFlowManagement";

interface Props {}

export const QuestionCreationLayout: FunctionComponent<Props> = () => {

  const navigate = useNavigate()
  const { quizId } = useParams()
  const { submit, actionFeedback } = useQuestionCRUD()
  const {    
    setQuizActionSuccess,
  } = useStore((state) => ({
    setQuizActionSuccess: state.setQuizActionSuccess
  }), shallow)
  
  useEffect(() => {
    if (actionFeedback === QuestionCRUDFeedback.success) {
      setQuizActionSuccess(QuizSuccessStates.question_created)
      navigate(`/quiz/${quizId}`)
      return
    }

    if (actionFeedback === QuestionCRUDFeedback.error) {
      // TODO do we navigate? 
      toast.error('ERROR CREATING QUESTION', { duration: 3000 })
    }
  }, [actionFeedback])
  
  return (
    <QuestionFlowManagement 
      actionFeedback={actionFeedback}
      onSubmit={(question) => {
        submit(quizId, question)
      }}
    />
  ) 
}