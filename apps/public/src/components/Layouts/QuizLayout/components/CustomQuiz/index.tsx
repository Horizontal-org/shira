import { FunctionComponent, useCallback, useEffect, useState } from 'react'
import { QuizInstructions } from './QuizInstructions'
import { useStore } from '../../../../../store'
import { shallow } from 'zustand/shallow'
import { SceneWrapper } from '../../../../UI/SceneWrapper'
import { Question } from '../../../../UI/Question'
import { Question as QuestionType } from '../../../../../domain/question'
import { useQuizRun, Answer } from '../../../../../hooks/useQuizRun'

type RunAnswer = 'is_phishing' | 'is_legitimate' | 'dont_know';

interface Props {
  questions: QuestionType[];
  quizId: number | string;
  images: Array<{ imageId: number; url: string }>;
}

export const CustomQuiz: FunctionComponent<Props> = ({
  questions,
  quizId,
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

  const { started: hasRunId, start, recordAnswer, finish } = useQuizRun(quizId);

  const q = questions.length > 0 ? questions[questionIndex] : null
  const currentQuestionId = q?.id ?? null

  useEffect(() => {
    if (started && !hasRunId) {
      start(quizId, null)
    }
  }, [started, hasRunId, start, quizId])

  const handleAnswer = useCallback(
    (answer: RunAnswer) => {
      if (!currentQuestionId) return
      recordAnswer(Number(currentQuestionId), answer as Answer)
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
            if (questionIndex < questions.length - 1) {
              handleQuestionIndex((i) => i + 1)
              return
            }
            finish()
            changeScene("completed")
          }}
          goBack={() => {
            if (questionIndex > 0) {
              handleQuestionIndex(questionIndex - 1)
            } else {
              changeScene('quiz-setup-name')
            }
          }}
          setCorrectQuestions={() => { setCorrectQuestions(questions[questionIndex]) }}
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
