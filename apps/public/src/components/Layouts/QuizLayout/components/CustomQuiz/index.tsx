import { FunctionComponent, useState } from 'react'
import { useStore } from '../../../../../store'
import { shallow } from 'zustand/shallow'
import { SceneWrapper } from '../../../../UI/SceneWrapper'
import { Question } from '../../../../UI/Question'
import { Question as QuestionType } from '../../../../../domain/question'
import { Answer } from '../../../../../fetch/quiz_runs'
import { QuizInstructions } from '../../../../UI/QuizInstructions'
import { QuizItem } from '../../../../../domain/quiz_item'
import { NoteView } from '../../../../UI/NoteView'

type RunAnswer = 'is_phishing' | 'is_legitimate' | 'dont_know';

interface Props {
  questions: QuestionType[];
  quizId: number;
  quizItems: QuizItem[]
  images: Array<{ imageId: number; url: string }>;
  startRun: () => void;
  recordAnswer: (questionId: number, answer: RunAnswer) => void;
  runStarted: boolean;
  hasResultsEnabled: boolean;
  hasAssessmentEnabled: boolean;
}

export const CustomQuiz: FunctionComponent<Props> = ({
  questions,
  images,
  startRun,
  runStarted,
  recordAnswer,
  hasResultsEnabled,
  hasAssessmentEnabled,
  quizItems
}) => {

  const {
    changeScene,
    setCorrectQuestions
  } = useStore((state) => ({
    changeScene: state.changeScene,
    setCorrectQuestions: state.setCorrectQuestions,
  }), shallow)

  const [started, handleStarted] = useState(false)
  // const [questionIndex, handleQuestionIndex] = useState(0)
  const [itemIndex, handleItemIndex] = useState(0)

  // const q = questions.length > 0 ? questions[questionIndex] : null
  const quizItem = quizItems.length > 0 ? quizItems[itemIndex] : null

  // const currentQuestionId = q?.id ?? null

  const onNext = () => {
    if (itemIndex < quizItems.length - 1) {
      handleItemIndex((i) => i + 1)
      return
    }
    changeScene("completed")
  }

  const goBack = () => {
    if (itemIndex > 0) {
      handleItemIndex(itemIndex - 1)
    } else {
      changeScene('quiz-setup-name')
    }
  }

  return (
    <SceneWrapper>
      {started ? (
        <>
          {quizItem.entityType === 'question' && (
            <Question
              key={itemIndex}
              question={quizItems.length > 0 && quizItems[itemIndex].question}
              images={images}
              questionIndex={itemIndex}
              questionCount={quizItems.length}
              changeScene={changeScene}
              hasAssessmentEnabled={hasAssessmentEnabled}
              onAnswer={(answer: RunAnswer) => {
                if (!runStarted) return
                recordAnswer(Number(quizItems[itemIndex].question.id), answer as Answer)
              }}
              onNext={onNext}
              goBack={goBack}
              setCorrectQuestions={() => { setCorrectQuestions(quizItems[itemIndex].question) }}
            />
          )}
          {quizItem.entityType === 'note' && (
            <NoteView
              key={itemIndex}
              note={quizItems.length > 0 && quizItems[itemIndex].note}
              noteIndex={itemIndex}
              noteCount={quizItems.length}
              changeScene={changeScene}
              onNext={onNext}
              goBack={goBack}
            />
          )}
        </>

      ) : (
        <QuizInstructions
          count={quizItems ? quizItems.length : 0}
          hasResultsEnabled={hasResultsEnabled}
          isCustom={true}
          onNext={() => {
            if (!runStarted) {
              startRun()
            }
            handleStarted(true)
          }}
        />
      )}
    </SceneWrapper>
  )
}
