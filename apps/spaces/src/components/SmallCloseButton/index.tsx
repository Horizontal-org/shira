import { FunctionComponent } from 'react'
import styled from 'styled-components'

interface Props {
  onClose: () => void
}

export const SmallCloseButton: FunctionComponent<Props> = ({ onClose }) => {
  return (
    <Close onClick={onClose}>X</Close>
  )
}

const Close = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 2px solid #ddd;
  color: #ddd;
  cursor: pointer;
  transition: all 0.1s;
  width: 22px;
  height: 22px;
  min-width: 22px;
  min-height: 22px;
  font-size: 10px;
  font-weight: 700;
  padding-left: 1px;
  &:hover {
    border: 2px solid #50AFD8;
    color: #50AFD8;
  }
`
