import { FunctionComponent, useEffect } from "react"
import { 
  styled,
  Logo,
  Body2Regular,
  Button
} from "@shira/ui"
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { QuestionCRUDFeedback, useQuestionCRUD } from "../../fetch/question";

interface Props {
  onNext: () => void
  onBack: () => void
  step: number
  disableNext: boolean
  actionFeedback: string;
}

export const QuestionFlowHeader: FunctionComponent<Props> = ({
  onNext,
  onBack,
  disableNext,
  step,
  actionFeedback
}) => {

  const navigate = useNavigate()
  
  return (
    <Wrapper>
      <Left>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        
        <CloseWrapper onClick={() => { navigate(-1) }}>
          <IoClose 
            color="#5F6368"
            size={24}
          />
        </CloseWrapper>

        <Body2Regular>Create a new question</Body2Regular>
      </Left>
      <Right>
        <Button
          leftIcon={<FiChevronLeft size={16} />}
          onClick={onBack}
          text="Back"
          type="outline"
        />
        <Button
          color="#52752C"
          rightIcon={<FiChevronRight size={16} />}
          disabled={disableNext || actionFeedback === QuestionCRUDFeedback.processing}
          onClick={onNext}
          text={step === 2 ? (actionFeedback === QuestionCRUDFeedback.processing ? 'Saving...' : 'Save') : 'Next'}
          type="primary"
        />
      </Right>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  background: white;
  height: 72px;
  max-height: 72px;
  min-height: 72px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
`
  
const LogoWrapper = styled.div`
  padding: 0 24px;
  border-right: 1px solid ${props => props.theme.colors.dark.mediumGrey};
`

const CloseWrapper = styled.div`
  padding: 0 8px;
  margin: 0 20px;
  cursor: pointer;
  display: flex; 
  align-items: center;
`

const Left = styled.div`
  display: flex;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 24px;
`