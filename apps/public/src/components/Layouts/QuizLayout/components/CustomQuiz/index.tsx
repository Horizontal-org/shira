import { FunctionComponent, useCallback, useState } from 'react'
import { QuizInstructions } from './QuizInstructions'
import { useStore } from '../../../../../store'
import { shallow } from 'zustand/shallow'
import { SceneWrapper } from '../../../../UI/SceneWrapper'
import { Question } from '../../../../UI/Question'
import { Question as QuestionType } from '../../../../../domain/question'
import { useQuizRun } from '../../../../../context/QuizRunContext'

type RunAnswer = 'is_phishing' | 'is_legitimate' | 'dont_know'

interface Props {
  questions: QuestionType[]
  images: Array<{ imageId: number; url: string }>
}

export const CustomQuiz:FunctionComponent<Props> = ({
  questions,
  images
}) => {
  const {
    changeScene,
    setCorrectQuestions
  } = useStore((state) => ({
    changeScene: state.changeScene,
    setCorrectQuestions: state.setCorrectQuestions,
  }), shallow)

  const [started, handleStarted] = useState(false)
  const [questionIndex, handleQuestionIndex] = useState(0)

  // buffer answers locally (sessionStorage) via QuizRunContext
  const { recordAnswer } = useQuizRun()

  const q = questions.length > 0 ? questions[questionIndex] : null
  const currentQuestionId = q?.id ?? null

  const handleAnswer = useCallback(
    (ans: RunAnswer) => {
      if (!currentQuestionId) return
      console.log('[UI] onAnswer', { questionId: currentQuestionId, ans })
      recordAnswer(Number(currentQuestionId), ans)
    },
    [currentQuestionId, recordAnswer]
  )

  return (
    <SceneWrapper>
      {started ? (
        <Question
          key={questionIndex}
          question={questions.length > 0 && questions[questionIndex]}
          images={images}
          questionIndex={questionIndex}
          questionCount={questions.length}
          changeScene={changeScene}
          onAnswer={handleAnswer}
          onNext={() => {
            if (questionIndex < (questions.length - 1)) {
              handleQuestionIndex(questionIndex + 1)
            } else {
              changeScene('completed')
            }
          }}
          goBack={() => {
            if (questionIndex > 0) {
              handleQuestionIndex(questionIndex - 1)
            } else {
              changeScene('quiz-setup-name')
            }
          }}
          setCorrectQuestions={() => setCorrectQuestions(questions[questionIndex])}
        />
      ) : (
        <QuizInstructions
          count={questions ? questions.length : 0}
          onNext={() => {
            handleStarted(true)
          }}
        />
      )}
    </SceneWrapper>
  )
}