import { FunctionComponent, useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"

import { InvalidQuiz } from "./components/InvalidQuiz"
import { QuizFlow } from "./components/QuizFlow"
import { getLearnerQuizByHash } from "../../../fetch/learner"
import { getCustomQuizByHash } from "../../../fetch/quiz"

interface Props { }

export const QuizLayout: FunctionComponent<Props> = () => {
  const { hash } = useParams()
  let location = useLocation()
  console.log("🚀 ~ QuizLayout ~ hash:", hash)
  console.log("🚀 ~ QuizLayout ~ location:", location)

  const [quiz, handleQuiz] = useState(null)
  const [learnerQuiz, handleLearnerQuiz] = useState(null)

  const [showUnavailable, handleShowUnavailable] = useState(false)
  
  console.log("🚀 ~ QuizLayout ~ quiz:", quiz)

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

  if (showUnavailable) return <InvalidQuiz />

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