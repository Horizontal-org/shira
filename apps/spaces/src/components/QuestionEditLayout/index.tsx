import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchQuestion, QuestionCRUDFeedback, useQuestionCRUD } from "../../fetch/question";
import { useStore } from "../../store";
import { shallow } from "zustand/shallow";
import { QuestionToBe } from "../QuestionFlowManagement/types";
import { getContentObject, getQuestionValues } from "./utils";
import { QuestionFlowManagement } from "../QuestionFlowManagement";
import { QuizSuccessStates } from "../../store/slices/quiz";
import toast from "react-hot-toast";

interface Props {

}

export const QuestionEditLayout: FunctionComponent<Props> = () => {

  const navigate = useNavigate()
  const { quizId, questionId } = useParams()
  const { edit, actionFeedback } = useQuestionCRUD()
  const {    
    setQuizActionSuccess,
    setInitialExplanations,
    clearExplanations
  } = useStore((state) => ({
    setInitialExplanations: state.setInitialExplanations,
    setQuizActionSuccess: state.setQuizActionSuccess,
    clearExplanations: state.clearExplanations
  }), shallow)

  const [initialQuestion, handleQuestion] = useState<QuestionToBe>(null)
  const [initialContent, handleContent] = useState({})

  useEffect(() => {
    const getAndParseQuestion = async() => {
      const question = await fetchQuestion(questionId)

      // SET EXPLANATIONS
      if (question.explanations && question.explanations.length > 0) {
        setInitialExplanations(question.explanations.map((e) => {
          return {
            text: e.text,
            index: parseInt(e.index),
            position: parseInt(e.position)
          }
        }))
      }
      
      const htmlContent = new DOMParser().parseFromString(question.content, 'text/html')
      
      // PARSE CONTENT      
      handleContent(getContentObject(htmlContent))

      // PARSE QUESTION 
      handleQuestion(getQuestionValues(question, htmlContent))
    }

    getAndParseQuestion()

    return () => {
      clearExplanations()
    }
  }, [])


  useEffect(() => {
    if (actionFeedback === QuestionCRUDFeedback.success) {
      setQuizActionSuccess(QuizSuccessStates.question_updated)
      navigate(`/quiz/${quizId}`)
      return
    }

    if (actionFeedback === QuestionCRUDFeedback.error) {
      // TODO do we navigate? 
      toast.error('ERROR EDITING QUESTION', { duration: 3000 })
    }
  }, [actionFeedback])

  if (!initialContent || !initialQuestion) {
    return null
  }

  return (
    <QuestionFlowManagement 
      onSubmit={(question) => {
        edit(quizId, question, questionId)
      }}
      initialContent={initialContent}
      initialQuestion={initialQuestion}
      actionFeedback={actionFeedback}
    />
  ) 
}