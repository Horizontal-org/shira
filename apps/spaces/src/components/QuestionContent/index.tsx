import { FunctionComponent } from "react";
import { styled, Box } from '@shira/ui'
import { EmailContent } from "./components/EmailContent";
import { Explanations } from "../Explanations";
import { CommonHeader } from "./components/CommonHeader";
import { MessagingContent } from "./components/MessagingContent";
import { ActiveQuestion } from "../../store/types/active_question";

interface Props {
  question: ActiveQuestion
}

export const QuestionContent: FunctionComponent<Props> = ({
  question,
}) => {

  return (
    <Wrapper id='dynamic-content'>
    
      <StyledBox>
        <CommonHeader
          isPhishing={question.isPhishing}
        />        

        { question.app.type === 'email' && (
          <EmailContent 
            question={question}
            content={question.content}
          />
        )}

        { question.app.type === 'messaging' && (
          <MessagingContent 
            question={question}
            content={question.content}            
          />
        )}
        
      </StyledBox> 

      <Explanations />  
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
  padding: 32px 48px;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
`