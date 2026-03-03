import { FunctionComponent, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

import { QuizFlow } from "./components/QuizFlow"
import { getLearnerQuizByHash } from "../../../fetch/learner"
import { getCustomQuizByHash } from "../../../fetch/quiz"
import { InvalidLink } from "../../UI/InvalidLink"
import { useTranslation } from "react-i18next"

interface Props { }

export const QuizLayout: FunctionComponent<Props> = () => {
  const { hash } = useParams()
  let location = useLocation()
  const { t } = useTranslation()

  const [quiz, handleQuiz] = useState(null)
  const [learnerQuiz, handleLearnerQuiz] = useState(null)

  const [showUnavailable, handleShowUnavailable] = useState(false)
  

  const getQuiz = async (hash) => {
    let rawQuiz = null
    
    try {
      if (location.pathname.includes('/learner-quiz/')) {
        const rawLearnerQuiz = await getLearnerQuizByHash(hash)
        rawQuiz = rawLearnerQuiz.quiz
        handleLearnerQuiz(rawLearnerQuiz.learnerQuiz)
      } else {
        rawQuiz = await getCustomQuizByHash(hash)
      }

      handleQuiz(rawQuiz)
    } catch (e) {
      handleShowUnavailable(true)
      console.log("🚀 ~ getQuiz ~ e:", e)
    }
  }

  useEffect(() => {
    getQuiz(hash)    
  }, [hash])

  if (showUnavailable) return (
    <InvalidLink 
      title={t("invalid_quiz.title")}
      description={t("invalid_quiz.description")}
      homeButtonText={t("invalid_quiz.home_button")}
    />
  )

  if (!quiz) return null

  return (
      <>
        <QuizFlow 
          quiz={quiz}
          learnerQuiz={learnerQuiz}
        />
      </>
  )
}