import { FunctionComponent, useEffect, useState } from 'react'
import { Question as QuestionType } from '../../../domain/question';
import { AppLayout } from '../../Layouts/AppLayout';
import { AnswerFeedback } from '../AnswerFeedback';
import { AnswerOptions } from '../AnswerOptions';
import { QuizFooter } from '../QuizFooter';
import { SceneWithFooter } from '../SceneWithFooter';
import { Explanation } from '../../../domain/explanation';
import useGetWidth from '../../../hooks/useGetWidth';
import { useStore } from '../../../store';

interface Props {
  question: QuestionType;
  questionCount: number;
  questionIndex: number;
  onNext: () => void;
  goBack: () => void;
  changeScene: (scene: string) => void;
  setCorrectQuestions:() => void;
}

export const Question: FunctionComponent<Props> = ({
  question,
  questionCount,
  questionIndex,
  goBack,
  onNext,
  setCorrectQuestions
}) => {
  const { width } = useGetWidth()
  const [answer, handleAnswer] = useState<string | null>(null)
  const [ explanationNumber, setExplanationNumber ] = useState<number>(0)
  const [explanationsOrder, handleExplanationsOrder] = useState<Array<number>>([])

  const [showExplanations, handleShowExplanations] = useState<boolean>(false)
  
  const [isExpanded, handleIsExpanded] = useState(false)

  const { persistedEmail, persistedName } = useStore(
    (state) => ({
      persistedName: state.setup.name,
      persistedEmail: state.setup.email,
    })
  )
  
  useEffect(() => {
    const order = parseExplanations(question.explanations)
      .sort((a, b) => parseInt(a.position) - parseInt(b.position))
      .map(e => parseInt(e.index))

    handleExplanationsOrder(order)

    const anchorElements = document.querySelectorAll('a')

    anchorElements.forEach((element) => {
      element.addEventListener('click', (event) => {
        event.preventDefault()
      })

      element.addEventListener('contextmenu', (event) => {
        event.preventDefault()
      })
    })
  }, [])

  useEffect(() => {
    const realAnswer = question.isPhising ? 'phishing' : 'legitimate'
    if (answer === realAnswer) {
      setCorrectQuestions()
    }
  }, [answer])

  const parseExplanations = (explanation: Explanation[]):Explanation[] => 
    explanation.filter( expl =>  document.querySelector(`[data-explanation="${expl.index}"]`))

  return (
    <SceneWithFooter>

      <AppLayout 
        app={question.app}
        content={question.content.replace('{{name}}', persistedName).replace('{{email}}', persistedEmail)}
        explanations={parseExplanations(question.explanations)}
        explanationNumber={explanationsOrder[explanationNumber]}
        answer={answer}
        showExplanations={showExplanations}
      />

      <QuizFooter
        title={`${questionIndex + 1}/${questionCount}`}
        hideCloseButton={(width <= 1024 && parseExplanations(question.explanations).length > 0 && !!(answer) && !showExplanations)}
        hasAnswer={!!(answer)}
        showExplanations={showExplanations}
        isExpanded={isExpanded}
        handleIsExpanded={handleIsExpanded}        
        action={answer ? (
          <AnswerFeedback
            showExplanations={showExplanations}
            handleShowExplanations={handleShowExplanations}
            explanationNumber={explanationNumber}
            explanationsLength={parseExplanations(question.explanations).length}
            setExplanationNumber={(n) => { setExplanationNumber(n)}}
            onNext={onNext}
            userAnswer={answer}
            onAnswer={(a) => { handleAnswer(a) }}
            realAnswer={question.isPhising ? 'phishing' : 'legitimate'}
          />
        ) : <AnswerOptions 
              goBack={goBack} 
              onAnswer={(a) => { 
                handleIsExpanded(false)
                handleAnswer(a) 
              }} 
              isExpanded={isExpanded}
              handleIsExpanded={handleIsExpanded} 
            />
        }
      />
    </SceneWithFooter>
  )
}