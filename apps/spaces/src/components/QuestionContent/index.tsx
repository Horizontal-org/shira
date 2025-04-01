import { FunctionComponent } from "react";
import { styled, Box, Body2Regular } from '@shira/ui'
import { EmailContent } from "./components/EmailContent";
import { QuestionToBe, EmailContent as EmailContentType } from "../QuestionManagementLayout/types";
import { Explanations } from "../Explanations";

interface Props {
  question: QuestionToBe
  handleContent: (id: string, value: string) => void
  content: Object
}

export const QuestionContent: FunctionComponent<Props> = ({
  question,
  handleContent,
  content
}) => {


  return (
    <Wrapper id='dynamic-content'>
      
      <StyledBox>
        <Body2Regular>You are writing a { question.isPhishing ? 'phishing' : 'truthful' } message.</Body2Regular>

        { question.app.type === 'email' && (
          <EmailContent 
            handleContent={handleContent}
            question={question}
          />
        )}
      </StyledBox> 

      <Explanations 
        content={content}
        handleContent={handleContent}
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
`