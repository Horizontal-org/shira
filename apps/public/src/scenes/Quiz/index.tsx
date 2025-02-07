import { FunctionComponent, useEffect, useState } from 'react'
import shallow from 'zustand/shallow'
import { Question } from '../../components/UI/Question'

import { SceneWrapper } from '../../components/UI/SceneWrapper'
import { useStore } from '../../store'
import { QuizInstructions } from './QuizInstructions'
// import  {DAPClient} from 'divviup-ts/packages/dap'
import {Task} from "@divviup/dap/dist/task";

import { useTranslation } from 'react-i18next'

interface Props {}

const quizCreation = async() => {
  if (process.env.REACT_APP_ENABLE_ANALYTICS == 'yes') {
    const task = new Task({
      type: "count",
      id: "Eld5WkALoWMG-hc2sHyDXHIBOn1VE3DuV2ZLN2eUfWA",
      leader: "https://dap-09-3.api.divviup.org/",
      helper: "https://helper-dap-09.shira.app/",
      timePrecisionSeconds: 300
    });
    await task.sendMeasurement(true);
    console.log('sent;')        
  }
}

const quizEnd = async() => {
  if (process.env.REACT_APP_ENABLE_ANALYTICS == 'yes') {
    const task = new Task({
      type: "count",
      id: "DD7RBmAB6uHS3lCucrggpHeipFpXNHHLHx4fO6nbELU",
      leader: "https://dap-09-3.api.divviup.org/",
      helper: "https://helper-dap-09.shira.app/",
      timePrecisionSeconds: 300
    });
    await task.sendMeasurement(true);
    console.log('sent;')        
  }
}

export const Quiz:FunctionComponent<Props> = () => {
  const {
    changeScene,
    apps,
    fieldsOfWork,
    fetchQuiz,
    quiz,
    setCorrectQuestions
  } = useStore((state) => ({
    changeScene: state.changeScene,
    apps: state.setup.apps,
    fieldsOfWork: state.setup.fields_of_work,
    fetchQuiz: state.fetchQuiz,
    quiz: state.quiz,
    setCorrectQuestions: state.setCorrectQuestions
  }), shallow)

  const [questions, handleQuestions] = useState([])
  const [started, handleStarted] = useState(false)
  const [questionIndex, handleQuestionIndex] = useState(0)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const startQuiz = async() => {
      fetchQuiz(apps, fieldsOfWork, i18n.language)
    }

    startQuiz()
  }, [])

  useEffect(() => {
    if (quiz) {
      handleQuestions(quiz)
    }
  }, [quiz])

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
              quizEnd()
              changeScene('feedback')
            }
          }}
          goBack={() => {
            if (questionIndex > 0) {
              handleQuestionIndex(questionIndex - 1)
            } else {
              changeScene('quiz-setup-work')
            }
          }}
          setCorrectQuestions={() => setCorrectQuestions(questions[questionIndex])}
        />
      ) : (
        <QuizInstructions 
          onNext = {() => {
            if (quiz.length === 0) { 
              changeScene('feedback')                  
            } else {
              quizCreation()
              handleStarted(true) 
            }
          }}
        />
      )}
    </SceneWrapper>
  )
}