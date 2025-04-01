import React, { FunctionComponent } from 'react'
import { HiOutlineChatBubbleBottomCenter } from 'react-icons/hi2'
import { styled } from '@shira/ui'

interface Props {
  onClick: () => void
  active: boolean
}

export const ExplanationButton: FunctionComponent<Props> = ({ onClick, active }) => {
  return (
    <SvgWrapper 
      onClick={onClick}
      active={active}
    >
      <HiOutlineChatBubbleBottomCenter 
        size={24}       
      /> 
    </SvgWrapper>

  )
}

interface StyledSvgWrapper {
  active: boolean;
}

const SvgWrapper = styled.div<StyledSvgWrapper>`
  cursor: pointer;
  margin-left: 12px;  
  border-radius: 50%;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  
  transition: 0.2s all;
  > svg {
    stroke: #ddd;
  }

  &:hover {
    stroke: ${props => props.theme.primary.base};
    background: #f1f2f4;
  }
  
  ${props =>  props.active && `
    > svg {
      stroke: ${props.theme.primary.base};
    }
  `
}
`