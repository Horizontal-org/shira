import { FunctionComponent, ReactNode } from "react"
import { CloseButton } from "../CloseButton";
import { Logo } from "../Icons";
import { Body2Regular } from '../Typography'
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

        <StyledCloseButton
          aria-label="Close"
          iconSize={24}
          id="flow-header-close"
          onClick={onExit}
          size={24}
        />

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
  border-inline-end: 1px solid ${props => props.theme.colors.dark.mediumGrey};
`

const StyledCloseButton = styled(CloseButton)`
  margin: 0 20px;
`

const Left = styled.div`
  display: flex;
  align-items: center;
`

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-inline-end: 24px;
`
