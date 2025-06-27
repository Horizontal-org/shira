import { FunctionComponent, useEffect, useState } from 'react'
import { QuizInstructions } from './QuizInstructions'
import { useTranslation } from 'react-i18next'
import { useStore } from '../../../../../store'
import { shallow } from 'zustand/shallow'
import { SceneWrapper } from '../../../../UI/SceneWrapper'
import { Question } from '../../../../UI/Question'
import { Question as QuestionType } from '../../../../../domain/question'

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
    setCorrectQuestions: state.setCorrectQuestions
  }), shallow)

  const [started, handleStarted] = useState(false)
  const [questionIndex, handleQuestionIndex] = useState(0)
  const { t, i18n } = useTranslation()

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
          onNext={() => { 
            if (questionIndex < (questions.length -1)) {
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
          onNext = {() => {
            handleStarted(true)             
          }}
        />
      )}
    </SceneWrapper>
  )
}