import { FunctionComponent, useEffect, useState, useCallback } from 'react'
import { Question as QuestionType } from '../../../domain/question'
import { AppLayout } from '../../Layouts/AppLayout'
import { AnswerFeedback } from '../AnswerFeedback'
import { AnswerOptions } from '../AnswerOptions'
import { QuizFooter } from '../QuizFooter'
import { SceneWithFooter } from '../SceneWithFooter'
import { Explanation } from '../../../domain/explanation'
import useGetWidth from '../../../hooks/useGetWidth'
import { useStore } from '../../../store'

export type RunAnswer = 'is_phishing' | 'is_legitimate' | 'dont_know'
const toRunAnswer = (a: string): RunAnswer =>
  a === 'phishing' ? 'is_phishing' : a === 'legitimate' ? 'is_legitimate' : 'dont_know'

type Props = {
  question: QuestionType
  questionCount: number
  questionIndex: number
  images?: Array<{ imageId: number; url: string }>
  onNext: () => void
  goBack: () => void
  changeScene?: (scene: string) => void
  setCorrectQuestions: () => void
  onAnswer?: (ans: RunAnswer) => void
}

export const Question: FunctionComponent<Props> = ({
  question,
  questionCount,
  questionIndex,
  images,
  goBack,
  onNext,
  setCorrectQuestions,
  onAnswer,
}) => {
  const { width } = useGetWidth()
  const [answer, setAnswer] = useState<string | null>(null)
  const [explanationNumber, setExplanationNumber] = useState<number>(0)
  const [explanationsOrder, setExplanationsOrder] = useState<number[]>([])
  const [showExplanations, setShowExplanations] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const { persistedEmail, persistedName } = useStore((state) => ({
    persistedName: state.setup.name,
    persistedEmail: state.setup.email,
  }))

  useEffect(() => {
    const order = parseExplanations(question.explanations)
      .sort((a, b) => parseInt(a.position) - parseInt(b.position))
      .map((e) => parseInt(e.index))
    setExplanationsOrder(order)

    const anchors = document.querySelectorAll('a')
    anchors.forEach((el) => {
      el.addEventListener('click', (ev) => ev.preventDefault())
      el.addEventListener('contextmenu', (ev) => ev.preventDefault())
    })
  }, [question.explanations])

  useEffect(() => {
    const realAnswer = question.isPhising ? 'phishing' : 'legitimate'
    if (answer === realAnswer) setCorrectQuestions()
  }, [answer, question.isPhising, setCorrectQuestions])

  const select = useCallback(
    (uiAnswer: string) => {
      setIsExpanded(false)
      setAnswer(uiAnswer)
      const mapped = toRunAnswer(uiAnswer)
      console.log('[Question] select', { qId: question.id, uiAnswer, mapped })
      onAnswer?.(mapped)
    },
    [onAnswer, question.id]
  )

  const parseExplanations = (explanation: Explanation[]): Explanation[] =>
    explanation.filter((expl) => document.querySelector(`[data-explanation="${expl.index}"]`))

  return (
    <SceneWithFooter>
      <AppLayout
        app={question.app}
        content={question.content
          .replace('{{name}}', persistedName)
          .replace('{{email}}', persistedEmail)}
        explanations={parseExplanations(question.explanations)}
        explanationNumber={explanationsOrder[explanationNumber]}
        answer={answer}
        showExplanations={showExplanations}
        images={images}
      />

      <QuizFooter
        title={`${questionIndex + 1}/${questionCount}`}
        hideCloseButton={
          width <= 1024 &&
          parseExplanations(question.explanations).length > 0 &&
          !!answer &&
          !showExplanations
        }
        hasAnswer={!!answer}
        showExplanations={showExplanations}
        isExpanded={isExpanded}
        handleIsExpanded={setIsExpanded}
        action={
          answer ? (
            <AnswerFeedback
              showExplanations={showExplanations}
              handleShowExplanations={setShowExplanations}
              explanationNumber={explanationNumber}
              explanationsLength={parseExplanations(question.explanations).length}
              setExplanationNumber={(n) => setExplanationNumber(n)}
              onNext={onNext}
              userAnswer={answer}
              onAnswer={(a) => select(a)}
              realAnswer={question.isPhising ? 'phishing' : 'legitimate'}
            />
          ) : (
            <AnswerOptions
              goBack={goBack}
              onAnswer={(a) => select(a)}
              isExpanded={isExpanded}
              handleIsExpanded={setIsExpanded}
            />
          )
        }
      />
    </SceneWithFooter>
  )
}
