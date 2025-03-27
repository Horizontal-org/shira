import { FunctionComponent } from "react"
import { 
  styled,
  Logo,
  Body2Regular,
  Button
} from "@shira/ui"
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface Props {
  handleStep: (step: number) => void
  step: number
  disableNext: boolean
}

export const QuestionFlowHeader: FunctionComponent<Props> = ({
  handleStep,
  disableNext,
  step
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
          onClick={() => {
            if (step === 0) {
              navigate(-1)
            } else {
              handleStep(step - 1)
            }
          }}
          text="Back"
          type="outline"
        />
        <Button
          color="#52752C"
          rightIcon={<FiChevronRight size={16} />}
          disabled={disableNext}
          onClick={() => {
            if (step === 2) {
              // submit
            } else {
              handleStep(step + 1)
            }
          }}
          text={step === 2 ? 'Save' : 'Next'}
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