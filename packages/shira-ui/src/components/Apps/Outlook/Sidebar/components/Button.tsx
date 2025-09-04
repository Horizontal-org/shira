import { FunctionComponent, ReactNode } from "react";
import styled from 'styled-components'

interface Props {
  children: ReactNode
  selected: boolean
}

export const Button:FunctionComponent<Props> = ({
  children,
  selected
}) => {
  return (
    <Wrapper $selected={selected}>
      { children }
    </Wrapper>
  )
}

const Wrapper = styled.div<{
  $selected: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  cursor: pointer;
  gap: 9px;
  border-radius: 4px;

  &:hover {
    background: #f5f5f5;
  }
    
  ${props => props.$selected && `
    background: #f5f5f5;
    &:before {
      content: ' ';
      height: 22px;
      width: 1.4px;
      margin-left: -1px;
      background: #0F6CBD;
      border-radius: 4px;
      margin-left: -10px;
    }
  `}
`