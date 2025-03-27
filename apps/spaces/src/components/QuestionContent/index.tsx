import { FunctionComponent } from "react";
import { styled, Box, Body2Regular } from '@shira/ui'
import { EmailContent } from "./components/EmailContent";
import { QuestionToBe } from "../QuestionManagementLayout/types";

interface Props {
  question: QuestionToBe
  handleQuestion: (k, v) => void;
}

export const QuestionContent: FunctionComponent<Props> = ({
  question,
  handleQuestion
}) => {
  return (
    <StyledBox>
      <Body2Regular>You are writing a { question.isPhishing ? 'phishing' : 'truthful' } message.</Body2Regular>

      { question.app.type === 'email' && (
        <EmailContent 
          handleQuestion={handleQuestion}
          question={question}
        />
      )}
    </StyledBox>   
  )
}

const StyledBox = styled(Box)`
  position: relative;
  z-index:1;
  padding: 48px;
  width: 1024px;
`