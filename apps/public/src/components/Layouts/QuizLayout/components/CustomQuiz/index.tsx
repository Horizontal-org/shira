import { FunctionComponent, useEffect, useState } from 'react'
import { QuizInstructions } from './QuizInstructions'
import { useStore } from '../../../../../store'
import { shallow } from 'zustand/shallow'
import { SceneWrapper } from '../../../../UI/SceneWrapper'
import { Question } from '../../../../UI/Question'
import { Question as QuestionType } from '../../../../../domain/question'

type RunAnswer = 'is_phishing' | 'is_legitimate' | 'dont_know';

interface Props {
  questions: QuestionType[];
  quizId: number;
  images: Array<{ imageId: number; url: string }>;
  hasRunId: boolean;
  startRun: (quizId: number, learnerId?: number | null) => Promise<void>;
  recordAnswer: (questionId: number, answer: RunAnswer) => void;
}

export const CustomQuiz: FunctionComponent<Props> = ({
  questions,
  quizId,
  images,
  hasRunId,
  startRun,
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

  useEffect(() => {
    if (started && !hasRunId) {
      startRun(quizId, null)
    }
  }, [started, hasRunId, startRun, quizId])

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
            if (questionIndex < questions.length - 1) {
              handleQuestionIndex((i) => i + 1)
              return
            }
            changeScene("completed")
          }}
          goBack={() => {
            if (questionIndex > 0) {
              handleQuestionIndex(questionIndex - 1)
            } else {
              changeScene('quiz-setup-name')
            }
          }}
          setCorrectQuestions={() => {setCorrectQuestions(questions[questionIndex])}}
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
