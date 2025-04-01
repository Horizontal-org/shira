import { FunctionComponent } from "react"
import { Body2Regular, Box, styled } from "@shira/ui"
import { QuestionToBe } from "../QuestionManagementLayout/types"

interface Props {
  question: QuestionToBe
}

export const QuestionReview: FunctionComponent<Props> = ({
  question
}) => {
  console.log("🚀 ~ question:", question)
  return (
    <StyledBox>
       <Body2Regular>Review</Body2Regular>    
    </StyledBox>
  )
}


const StyledBox = styled(Box)`
  position: relative;
  z-index:1;
  padding: 48px;
  width: 1024px;
`