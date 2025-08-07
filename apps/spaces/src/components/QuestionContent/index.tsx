import { FunctionComponent, useEffect } from "react";
import { styled, Box, Body2Regular } from '@shira/ui'
import { EmailContent } from "./components/EmailContent";
import { QuestionToBe, EmailContent as EmailContentType } from "../QuestionFlowManagement/types";
import { Explanations } from "../Explanations";
import { subscribe, unsubscribe } from "../../utils/customEvent";
import { cleanDeletedExplanations } from "../../utils/explanations";
import { CommonHeader } from "./components/CommonHeader";
import { MessagingContent } from "./components/MessagingContent";

interface Props {
  question: QuestionToBe
  handleContent: (id: string, value: string) => void
  handleQuestion: (k, v) => void;
  content: Object
  handleContentRemove: (id: string) => void
  handleContentFullChange: (newContent: Object) => void
}

export const QuestionContent: FunctionComponent<Props> = ({
  question,
  handleQuestion,
  handleContent,
  content,
  handleContentRemove,
  handleContentFullChange
}) => {


  const cleanAttachment = (deleteIndex) => {
    // try cleaning attachments       
    let update = false
    const newAtts = question.attachments && question.attachments.map((a) => {
      if (a.explanationIndex == deleteIndex) {
        update = true
        return {
          ...a,
          explanationIndex: null
        }
      }
      return a
    })
    if (update) {
      handleQuestion('attachments', newAtts)
    }
  }

  useEffect(() => {
    // fetchQuestion(id)

    subscribe('delete-explanation', (event) => {
      // try deleting from dom
      cleanDeletedExplanations(event.detail.deleteIndex)
    })

    return () => {
      unsubscribe('delete-explanation')
      // clean everything
      // clear()
    }
  }, [])

  return (
    <Wrapper id='dynamic-content'>
      
      <StyledBox>
        <CommonHeader
          isPhishing={question.isPhishing}
        />        

        { question.app.type === 'email' && (
          <EmailContent 
            question={question}
            content={content}
            handleContent={handleContent}
            handleQuestion={handleQuestion}
          />
        )}

        { question.app.type === 'messaging' && (
          <MessagingContent 
            question={question}
            content={content}
            handleContent={handleContent}
            handleQuestion={handleQuestion}
            handleContentFullChange={handleContentFullChange}
          />
        )}
        
      </StyledBox> 

      <Explanations 
        content={content}
        handleContent={handleContent}
        onDelete={(explId) => {
          // clean from attachments
          cleanAttachment(explId)
        }}
      />  
    </Wrapper> 
  )
}

const Wrapper = styled.div`
  width: 1024px;
  display: flex;
`
const StyledBox = styled(Box)`
  position: relative;
  z-index:1;
  padding: 48px;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
`