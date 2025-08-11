import React, { FunctionComponent } from 'react'
import { HiOutlineChatBubbleBottomCenter } from 'react-icons/hi2'
import { ExplanationIcon, styled } from '@shira/ui'

interface Props {
  onClick: () => void
  active: boolean
  disabled?: boolean
}

export const ExplanationButton: FunctionComponent<Props> = ({ 
  onClick, 
  active,
  disabled = false
}) => {
  return (
    <SvgWrapper 
      disabled={disabled}
      onClick={disabled ? null : onClick}
      active={active}
    >
      <ExplanationIcon /> 
    </SvgWrapper>

  )
}

interface StyledSvgWrapper {
  active: boolean;
  disabled: boolean
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
    stroke: ${props => props.theme.secondary.base};
    fill: ${props => props.theme.secondary.base};
    background: #f1f2f4;
  }
  
  ${props =>  props.active && `
    > svg {
      stroke: ${props.theme.secondary.base};
      fill: ${props.theme.secondary.base};

      > path {
       fill: ${props.theme.secondary.base};
      }
    }
  `}

  ${props => props.disabled && `
    cursor: auto;  
  `}
`