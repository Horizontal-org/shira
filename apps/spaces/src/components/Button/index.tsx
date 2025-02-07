import { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  text: string;
  onClick?: () => void
}

export const Button: FunctionComponent<Props> = ({
  text,
  onClick
}) => {
  return (
    <StyledButton onClick={onClick}>
      { text }
    </StyledButton>
  )
}

const StyledButton = styled.button`
  all: unset;
  border-radius: 4px;
  padding: 11px 16px;
  cursor: pointer;
  font-weight: 400;
  display: flex;
  color: #424242;
  justify-content: space-between;

  background: #eee;
  border: 2px solid #eee;

  &:active {
    border: 2px solid #424242;
  }
`