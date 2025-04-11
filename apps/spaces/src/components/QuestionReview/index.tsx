import { cloneElement, FunctionComponent, useEffect, useState } from "react"
import { Body2Regular, Box, Button, DatingApp, FBMessenger, Gmail, SMS, styled, Whatsapp } from "@shira/ui"
import { QuestionToBe } from "../QuestionManagementLayout/types"
import { AppComponents, getContentProps } from "./utils"
import { AppSelector } from "./components/AppSelector"

import '../../fonts/GoogleSans/style.css'
import '../../fonts/Segoe/style.css'
import { useStore } from "../../store"
import { shallow } from "zustand/shallow"

interface Props {
  question: QuestionToBe
}

export const QuestionReview: FunctionComponent<Props> = ({
  question
}) => {
 
   const {
     explanations
   } = useStore((state) => ({
     explanations: state.explanations,
   }), shallow)
   
  const [elementProps, handleElementProps] = useState(null)
  const [explanationNumber, setExplanationNumber] = useState<number>(0)
  const [explanationsOrder, handleExplanationsOrder] = useState<Array<number>>([])
  const [showExplanations, handleShowExplanations] = useState<boolean>(false)

  console.log("🚀 ~ explanationNumber:", explanationNumber)
  console.log("🚀 ~ explanationsOrder:", explanationsOrder)
  console.log("🚀 ~ elementProps:", elementProps)

  useEffect(() => {
    const order = explanations
      .sort((a, b) => a.position - b.position)
      .map(e => e.index)

    handleExplanationsOrder(order)

    
    if (question && question.app) {      
      const contentProps = getContentProps(question.app.name, question.content)
      // add explanation props here 

      handleElementProps({
        ...contentProps        
      })
    }
  }, [])


  if (!question || !elementProps) {
    return
  }

  return (
    <>
      <StyledBox>        
        <AppSelector 
          appName={question.app.name}
          customProps={elementProps}
          explanationNumber={explanationNumber}
          showExplanations={showExplanations}
          explanations={explanations}
        />
        { showExplanations && (<Overlay />)}
      </StyledBox>
      <ReviewFooter>
        { showExplanations ? (
          <ExplanationButtonWrapper>
            { explanationNumber === 1 && (
              <Button 
                type="outline"
                onClick={() => {
                  handleShowExplanations(false)
                  setExplanationNumber(0)                
                }}
                text='Close explanations'
              />
            )}
            { explanationNumber > 1 && (
              <Button 
                onClick={() => {
                  setExplanationNumber(explanationNumber - 1)                
                }}
                text='Previous explanation'
              />  
            )}  
            { explanationNumber < explanations.length && (
              <Button 
                onClick={() => {
                  setExplanationNumber(explanationNumber + 1)                
                }}
                text='Next explanation'
              />
            )}
          </ExplanationButtonWrapper>
        ) : (
          <Button 
            type="outline"
            onClick={() => {
              if (explanationNumber === 0) {
                setExplanationNumber(explanationNumber + 1)
                handleShowExplanations(true)
              }
            }}
            text='Show explanations'
          />          
        )}
      </ReviewFooter>
    </>
  )
}


const StyledBox = styled.div`
  position: relative;
  z-index:1;
  background: white;
  padding: 24px;
  width: 1024px;
  height: 800px;
  box-sizing: border-box;
`

const ExplanationButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`

const ReviewFooter = styled.div`
  width: 1024px;
  padding: 12px 0;
  display: flex;
  justify-content: flex-end;
`



const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  height: 800px;
  width: 100%;
  background: rgba(0,0,0,0.5);
`
