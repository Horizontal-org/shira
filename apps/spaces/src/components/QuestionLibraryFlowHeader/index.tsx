import { FunctionComponent } from "react"
import { styled, Logo, Body2Regular, Button } from "@shira/ui"
import { IoClose } from "react-icons/io5";

interface Props {
  onExit: () => void;
}

export const QuestionLibraryFlowHeader: FunctionComponent<Props> = ({
  onExit
}) => {

  return (
    <Wrapper>
      <Left>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        
        <CloseWrapper onClick={onExit}>
          <IoClose 
            color="#5F6368"
            size={24}
          />
        </CloseWrapper>

        <Body2Regular>Add a question from the library</Body2Regular>
      </Left>
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