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
  images: Array<{ imageId: number; url: string; type: 'question' | 'note' }>;
  startRun: () => void;
  recordAnswer: (questionId: number, answer: RunAnswer) => void;
  runStarted: boolean;
  hasResultsEnabled: boolean;
  hasAssessmentEnabled: boolean;
}

export const CustomQuiz: FunctionComponent<Props> = ({
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
  const [itemIndex, handleItemIndex] = useState(0)

  const quizItem = quizItems.length > 0 ? quizItems[itemIndex] : null

  const questionImages = images.filter((i) => i.type === 'question')
  const noteImages = images.filter((i) => i.type === 'note')

  // counters only count questions, notes are not answerable
  const questionCount = quizItems.filter((item) => item.entityType === 'question').length
  const questionIndex = quizItems
    .slice(0, itemIndex)
    .filter((item) => item.entityType === 'question').length


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
              images={questionImages}
              questionIndex={questionIndex}
              questionCount={questionCount}
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
              images={noteImages}
              onNext={onNext}
              goBack={goBack}
            />
          )}
        </>

      ) : (
        <QuizInstructions
          count={questionCount}
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
