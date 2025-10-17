import { FunctionComponent, ReactNode } from "react";
import styled from 'styled-components'

interface Props {
  icon: ReactNode
  hasSeparator?: boolean
}

export const RightActionsButton:FunctionComponent<Props> = ({
  icon,
  hasSeparator = false
}) => {
  return (
    <Wrapper>
      { hasSeparator && (
        <Separator></Separator>
      )}
      <IconWrapper>
        { icon }
      </IconWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const Separator = styled.div`
  height: 24px;
  width: 1px;
  background: #e0e0e0;
`

const IconWrapper = styled.div`
  width: 32px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: rgb(235, 243, 252);
    > svg {
      fill: #115EA3; 
    }
  }
`