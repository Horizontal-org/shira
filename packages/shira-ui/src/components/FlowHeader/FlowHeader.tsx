import { FunctionComponent, ReactNode } from "react"
import { Logo } from "../Icons";
import { Body2Regular } from '../Typography'
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

interface FlowHeaderProps {
  actions: ReactNode
  onExit: () => void
  title: string;
}

export const FlowHeader: FunctionComponent<FlowHeaderProps> = ({
  title,
  onExit,
  actions
}) => {

  return (
    <Wrapper id="flow-header">
      <Left>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <CloseWrapper id="flow-header-close" onClick={onExit}>
          <IoClose
            color="#5F6368"
            size={24}
          />
        </CloseWrapper>

        <Body2Regular>{title}</Body2Regular>
      </Left>
      <Right>
        { actions }
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