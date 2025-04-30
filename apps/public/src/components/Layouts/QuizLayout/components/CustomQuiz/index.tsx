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
}

export const CustomQuiz:FunctionComponent<Props> = ({
  questions
}) => {
  const {
    changeScene,
    // apps,
    // fieldsOfWork,
    // fetchQuiz,
    // quiz,
    setCorrectQuestions
  } = useStore((state) => ({
    changeScene: state.changeScene,
    // apps: state.setup.apps,
    // fieldsOfWork: state.setup.fields_of_work,
    // fetchQuiz: state.fetchQuiz,
    // quiz: state.quiz,
    setCorrectQuestions: state.setCorrectQuestions
  }), shallow)

  // const [questions, handleQuestions] = useState([])
  const [started, handleStarted] = useState(false)
  const [questionIndex, handleQuestionIndex] = useState(0)
  const { t, i18n } = useTranslation()

  // useEffect(() => {
  //   const startQuiz = async() => {
  //     fetchQuiz(apps, fieldsOfWork, i18n.language)
  //   }

  //   startQuiz()
  // }, [])

  // useEffect(() => {
  //   if (quiz) {
  //     handleQuestions(quiz)
  //   }
  // }, [quiz])

  return (
    <SceneWrapper>
      
      {started ? (
        <Question 
          key={questionIndex}
          question={questions.length > 0 && questions[questionIndex]}
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
          onNext = {() => {
            handleStarted(true)             
          }}
        />
      )}
    </SceneWrapper>
  )
}