import React, { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  label: string;
  onClick: () => void;
  selected: boolean;
}

export const AppItem:FunctionComponent<Props> = ({
  label,
  onClick,
  selected
}) => {
  return (
    <Wrapper 
      onClick={onClick}
      selected={selected}
    >
      { label }
    </Wrapper>
  )
}

interface StyledWrapper {
  selected: boolean
}

const Wrapper = styled.div<StyledWrapper>`
  border: 2px solid #eee;
  background: #eee;
  border-radius: 4px;
  padding: 10px 16px;
  cursor: pointer;

  ${props => props.selected && `
    border: 2px solid #424242;
  `}
`